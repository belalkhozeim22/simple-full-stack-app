"use server";

import { getEnv } from "@/lib/env.utils";
import { userPermissionPluginAPI } from "../config";
import { TZodLoginFormSchema } from "../validations/login-form.zod";
import { setLoginCookies } from "./auth-cookies.actions";

const loginWithStrapi = userPermissionPluginAPI.usersPermissionsPostAuthLocal;

const getLoginRedirectURL = () => {
  return getEnv("AFTER_LOGIN_REDIRECT_URL", { required: true });
};

export const loginAction = async ({ email, password }: TZodLoginFormSchema) => {
  const loginResponse = await loginWithStrapi({
    identifier: email,
    password,
  });

  await setLoginCookies(loginResponse.data);

  return {
    redirectURL: getLoginRedirectURL(),
  };
};
