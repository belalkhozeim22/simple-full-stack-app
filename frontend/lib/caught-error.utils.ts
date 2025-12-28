import z from "zod";

export const ZEErrorName = z.enum([
  "AxiosError",
  "ForbiddenError",
  "ValidationError",
  "RateLimitError",
  "StrapiError",
  "UnexpectedError",
]);

export type EErrorName = z.infer<typeof ZEErrorName>;

export interface INormalizedError {
  message: string;
  details?: unknown | null;
  status: number;
  name: EErrorName;
}

export interface StrapiErrorResponse {
  data: null;
  error: INormalizedError;
}

export class CaughtError extends Error {
  status: INormalizedError["status"];
  details?: INormalizedError["details"];
  name: INormalizedError["name"];

  constructor(
    message: INormalizedError["message"],
    status: INormalizedError["status"] = 500,
    details?: INormalizedError["details"],
    name: INormalizedError["name"] = "UnexpectedError",
  ) {
    super(message);
    this.status = status;
    this.details = details;
    this.name = name;
  }
}
