"use server";
import { getEnv } from "@/lib/env.utils";
import { userPermissionPluginAPI } from "../config";
import { logoutFromCookies } from "./auth-cookies.actions";

const getLogoutRedirectURL = () => {
  return getEnv("AFTER_LOGOUT_REDIRECT_URL", { required: true });
};

const logoutFromStrapi = userPermissionPluginAPI.usersPermissionsPostAuthLogout;

export const logoutAction = async () => {
  await logoutFromStrapi();

  await logoutFromCookies();

  return {
    redirectURL: getLogoutRedirectURL(),
  };
};
