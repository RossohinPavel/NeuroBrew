import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import type { ApiRequestInit } from "@/common/api/fetcher";
import { refresh } from "@/common/api/generated/endpoints";
import { Cookies as SessionCookies } from "./cookies";


/** Определяет ответ об истечении access-токена. */
const isAuthorizationTokenExpired = async (response: Response) => {
  if (response.status !== 401) {
    return false;
  }

  const data = await response.clone().json() as { message?: string };

  return data?.message === "Authorization token expired";
};

/** Определяет, аутентифицирован ли пользователь в текущем запросе. */
export const isUserAuthenticated = cache(async () => {
  const cookieStore = await cookies();

  return cookieStore.has(SessionCookies.accessToken.name);
});

/** Добавляет access-токен к запросу и повторяет его после обновления истёкшей сессии. */
export const WITH_SESSION: ApiRequestInit = {
  prepareHeaders: async (headers) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(SessionCookies.accessToken.name)?.value;

    if (accessToken === undefined) {
      throw new Error("Authentication is required to perform this action.");
    }

    headers.set("Authorization", `Bearer ${accessToken}`);

    return headers;
  },
  // Подстраховка на случай того, что токен успел протухнуть в полете к бекенду))
  processResponse: async (response, url, options) => {
    if (await isAuthorizationTokenExpired(response)) {
      const cookieStore = await cookies();
      const refreshToken = cookieStore.get(SessionCookies.refreshToken.name)?.value;

      if (refreshToken !== undefined) {
        const refreshResponse = await refreshSession(refreshToken);

        if (refreshResponse?.status === 200) {
          const headers = new Headers(options.headers);
          headers.set("Authorization", `Bearer ${refreshResponse.data.accessToken}`);

          return fetch(url, {...options, headers});
        }
      }
    }
    return response;
  },
};

/** Запрашивает обновление сессии с помощью refresh-токена. */
export const refreshSession = async (refreshToken: string) => {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${refreshToken}`);
  return refresh({ headers });
};
