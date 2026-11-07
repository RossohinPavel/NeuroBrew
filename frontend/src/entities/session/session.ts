import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import type { ApiRequestInit } from "@/shared/api/fetcher";
import { refresh } from "@/shared/api/generated/endpoints";
import { Cookies as SessionCookies } from "./cookies";


/** Запрашивает обновление сессии с помощью refresh-токена. */
export const refreshSession = async (refreshToken: string) => {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${refreshToken}`);
  return refresh({ headers });
};

type ProcessResponse = NonNullable<ApiRequestInit["processResponse"]>;

// Подстраховка на случай того, что токен успел протухнуть в полете к бекенду))
const retryRequestOnExpiredAccessToken: ProcessResponse = async (response, url, options) => {
  if (response.status !== 401) {
    return response;
  }
  const data = await response.clone().json() as { message?: string };
  if (data?.message !== "Authorization token expired") {
    return response;
  }

  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(SessionCookies.refreshToken.name)?.value;
  if (refreshToken === undefined) {
    return response;
  }
  
  const refreshResponse = await refreshSession(refreshToken);
  if (refreshResponse?.status !== 200) {
    return response;
  }

  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${refreshResponse.data.accessToken}`);

  return fetch(url, {
    ...options,
    headers,
    signal: AbortSignal.timeout(10_000),
  });
};

/** Возвращает текущую сессию. */
export const getSession = cache(async (): Promise<ApiRequestInit | undefined> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(SessionCookies.accessToken.name)?.value;

  if (accessToken === undefined) {
    return undefined;
  }

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${accessToken}`);

  return {
    headers,
    processResponse: retryRequestOnExpiredAccessToken,
  };
});

/** Возвращает текущую сессию или сообщает, что пользователь не авторизован. */
export const getSessionOrThrow = async () => {
  const session = await getSession();

  if (session === undefined) {
    throw new Error("Authentication is required to perform this action.");
  }

  return session;
};

