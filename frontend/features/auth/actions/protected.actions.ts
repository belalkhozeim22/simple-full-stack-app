"use server";

import { userPermissionPluginAPI } from "../config";

const getMeFromStrapi = userPermissionPluginAPI.usersPermissionsGetUsersMe;

export const getMeAction = async () => {
  const { data: me } = await getMeFromStrapi();

  return me;
};
