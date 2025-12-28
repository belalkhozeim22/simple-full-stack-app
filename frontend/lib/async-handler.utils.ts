import axios from "axios";
import {
  CaughtError,
  INormalizedError,
  StrapiErrorResponse,
  ZEErrorName,
} from "./caught-error.utils";
import { logger } from "./logger";

export type SafeResult<T> =
  | { success: true; data: T; error?: never }
  | { success: false; error: INormalizedError; data?: never };

export function asyncHandler<TArgs extends unknown[], TOutput>(
  action: (...args: TArgs) => Promise<TOutput>,
  safe: true,
): (...args: TArgs) => Promise<SafeResult<TOutput>>;

export function asyncHandler<TArgs extends unknown[], TOutput>(
  action: (...args: TArgs) => Promise<TOutput>,
  safe?: false,
): (...args: TArgs) => Promise<TOutput>;

export function asyncHandler<TArgs extends unknown[], TOutput>(
  action: (...args: TArgs) => Promise<TOutput>,
  safe = false,
) {
  return (...args: TArgs) =>
    action(...args)
      .then((response) => (safe ? { success: true, data: response } : response))
      .catch((error: unknown) => {
        let normalizedError: CaughtError = new CaughtError(
          "Unexpected Error",
          500,
          null,
          "UnexpectedError",
        );

        if (error instanceof CaughtError) {
          normalizedError = new CaughtError(
            error.message,
            error.status,
            error.details,
            error.name,
          );
        } else if (axios.isAxiosError(error)) {
          const strapiData = error.response?.data as StrapiErrorResponse;

          normalizedError = new CaughtError(
            strapiData.error.message,
            error.response?.status,
            strapiData.error.details,
          );

          const errorNameValidationResult = ZEErrorName.safeParse(error.name);
          const strapiErrorNameValidationResult = ZEErrorName.safeParse(
            strapiData.error.name,
          );

          if (
            errorNameValidationResult.success &&
            strapiErrorNameValidationResult.success
          ) {
            normalizedError.name = strapiErrorNameValidationResult.data;
          } else if (strapiErrorNameValidationResult.success) {
            logger.asyncHandLer.info(
              `Unknown Error Name (${error.name}). Please, add it to the error name schema.`,
            );

            normalizedError.name = strapiErrorNameValidationResult.data;
          } else if (errorNameValidationResult.success) {
            logger.asyncHandLer.info(
              `Unknown Error Name (${strapiData.error.name}). Please, add it to the error name schema.`,
            );

            normalizedError.name = errorNameValidationResult.data;
          } else {
            logger.asyncHandLer.info(
              `Unknown Error Names (${strapiData.error.name}) (${error.name}). Please, add them to the error name schema.`,
            );
            normalizedError.name = "UnexpectedError";
          }
        } else if (error instanceof Error) {
          normalizedError = new CaughtError(error.message, 500, null);

          const errorNameValidationResult = ZEErrorName.safeParse(error.name);

          if (!errorNameValidationResult.success) {
            logger.asyncHandLer.info(
              `Unknown Error Name (${error.name}). Please, add it to the error name schema.`,
            );
            normalizedError.name = "UnexpectedError";
          } else {
            normalizedError.name = errorNameValidationResult.data;
          }
        }

        if (safe) {
          return {
            success: false,
            error: {
              message: normalizedError.message,
            },
          };
        }

        throw normalizedError;
      });
}
