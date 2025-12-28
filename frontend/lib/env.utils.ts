type availableEnvKeys =
  | "STRAPI_API_URL"
  | "STRAPI_API_TOKEN"
  | "AFTER_LOGIN_REDIRECT_URL"
  | "AFTER_LOGOUT_REDIRECT_URL"
  | "NODE_ENV"
  // NEXT_PUBLIC_
  | "NEXT_PUBLIC_SHOW_REACT_QUERY_DEV_TOOLS";

export function getEnv(
  key: availableEnvKeys,
  options: { defaultValue: string } | { required: true },
): string;

export function getEnv(
  key: availableEnvKeys,
  options?: { required: false },
): string | undefined;

/**
 * Retrieves the value of an environment variable based on the provided key.
 *
 * - If the key does not start with `NEXT_PUBLIC_` and the code is running on the client side,
 *   an error is thrown to prevent accessing private environment variables.
 * - If the environment variable is not found and the `required` option is set to `true`,
 *   an error is thrown indicating the missing variable.
 * - If the environment variable is not found and a `defaultValue` is provided in the options,
 *   the default value is returned.
 *
 * @param key - The key of the environment variable to retrieve. Must be a valid key from `availableEnvKeys`.
 * @param options - Optional configuration for handling missing environment variables:
 *   - `defaultValue`: A fallback value to use if the environment variable is not set.
 *   - `required`: A flag indicating whether the environment variable is mandatory.
 *
 * @returns The value of the environment variable, or the default value if specified.
 *
 * @throws Will throw an error if:
 * - A private environment variable is accessed on the client side.
 * - A required environment variable is missing.
 */
export function getEnv(
  key: availableEnvKeys,
  options?: { defaultValue: string } | { required: boolean },
): string | undefined {
  if (!process.env.NEXT_PUBLIC_ENABLE_GET_ENV) return "";

  if (!key.startsWith("NEXT_PUBLIC_") && typeof window !== "undefined") {
    throw new Error(
      `[KEY: ${key}] Accessing private environment variables on the client side is not allowed.`,
    );
  }

  const value = process.env[key];

  if (!value && options && "required" in options && options.required === true) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  if (
    !value &&
    options &&
    "defaultValue" in options &&
    options.defaultValue.length > 0
  ) {
    return options.defaultValue;
  }

  return value;
}
