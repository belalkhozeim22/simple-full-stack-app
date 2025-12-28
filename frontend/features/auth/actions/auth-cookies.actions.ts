import { cookies } from "next/headers";
import {
  COOKIE_CONFIG,
  JWT_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
  USER_COOKIE_NAME,
} from "../config";
import { UsersPermissionsPostAuthLocal200 } from "@/strapi-endpoints/__generated__/strapi-client/learningStrapiV5.schemas";

export const checkAuthCookies = async () => {
  const cookieStorage = await cookies();

  return !!cookieStorage.get(JWT_COOKIE_NAME);
};

export const setLoginCookies = async ({
  jwt,
  user,
}: UsersPermissionsPostAuthLocal200) => {
  const cookieStorage = await cookies();

  cookieStorage.set(JWT_COOKIE_NAME, jwt, COOKIE_CONFIG);
  cookieStorage.set(REFRESH_TOKEN_COOKIE_NAME, jwt, COOKIE_CONFIG);
  cookieStorage.set(USER_COOKIE_NAME, JSON.stringify(user), COOKIE_CONFIG);
};

export const logoutFromCookies = async () => {
  const cookieStorage = await cookies();

  cookieStorage.delete(JWT_COOKIE_NAME);
  cookieStorage.delete(REFRESH_TOKEN_COOKIE_NAME);
  cookieStorage.delete(USER_COOKIE_NAME);

  return;
};
