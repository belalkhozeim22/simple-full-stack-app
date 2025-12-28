"use server";

import { asyncHandler } from "@/lib/async-handler.utils";
import { getEnv } from "@/lib/env.utils";
import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { cookies } from "next/headers";

const BASE_URL = getEnv("STRAPI_API_URL", { required: true });
const STRAPI_API_TOKEN = getEnv("STRAPI_API_TOKEN", { required: true });

// Create a base instance without default auth headers
const strapiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Unified Mutator for Orval
 * Logic:
 * 1. Checks for 'jwt' in cookies (User context).
 * 2. If missing, falls back to env STRAPI_API_TOKEN (Admin/Service context).
 */
export const strapiClient = async <T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> =>
  asyncHandler(
    async (config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
      // 1. Check for the user token first
      const cookieStore = await cookies();
      const userToken = cookieStore.get("jwt")?.value;

      // 2. Determine which token to use
      // If userToken exists, use it. Otherwise, fallback to the Admin Token.
      const tokenToUse = userToken || STRAPI_API_TOKEN;

      if (tokenToUse) {
        config.headers = {
          ...config.headers, // Preserve existing headers
          Authorization: `Bearer ${tokenToUse}`,
        };
      }

      return strapiInstance(config);
    },
  )(config);
