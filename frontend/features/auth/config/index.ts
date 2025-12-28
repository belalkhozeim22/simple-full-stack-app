import { getEnv } from "@/lib/env.utils";
import { getUsersPermissions } from "@/strapi-endpoints/__generated__/strapi-client/users-permissions/users-permissions";

export const userPermissionPluginAPI = getUsersPermissions();

export const JWT_COOKIE_NAME = "jwt";
export const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
export const USER_COOKIE_NAME = "user";

export const COOKIE_CONFIG = {
  httpOnly: true,
  secure: getEnv("NODE_ENV", { required: true }) === "production",
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
  sameSite: "lax" as const,
};
