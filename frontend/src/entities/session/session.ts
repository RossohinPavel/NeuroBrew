import "server-only";

import { cookies } from "next/headers";
import type { ApiRequestInit } from "@/shared/api/fetcher";
import { refresh as refreshRequest } from "@/shared/api/generated/endpoints";
import type { Login200, Refresh200, Register201 } from "@/shared/api/generated/models";
import { ENV } from "@/shared/env";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import type { NextRequest, NextResponse } from "next/server";


const ACCESS_TOKEN_COOKIE_NAME = "access-token";
const REFRESH_TOKEN_COOKIE_NAME = "refresh-token";
const USER_ID_COOKIE_NAME = "user-id";
const USERNAME_COOKIE_NAME = "username";
const COOKIE_CONFIG: Partial<ResponseCookie> = {
  secure: ENV.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

/** Удаляет cookie сессии из хранилища для записи. */
export const clear = (responseCookies: Pick<NextResponse["cookies"], "delete">) => {
  responseCookies
    .delete(ACCESS_TOKEN_COOKIE_NAME)
    .delete(REFRESH_TOKEN_COOKIE_NAME)
    .delete(USER_ID_COOKIE_NAME)
    .delete(USERNAME_COOKIE_NAME);
};

/** Возвращает данные пользователя из cookie, если они заполнены корректно. */
export const getPayload = (cookieStore: Pick<NextRequest["cookies"], "get">) => {
  const userId = Number(cookieStore.get(USER_ID_COOKIE_NAME)?.value);
  const username = cookieStore.get(USERNAME_COOKIE_NAME)?.value;

  if (username === undefined || !Number.isSafeInteger(userId)) {
    return undefined;
  }

  return { userId, username };
};

/** Возвращает настройки запросов к API при наличии access token в cookie. */
export const getApiPayload = (cookieStore: Pick<NextRequest["cookies"], "get">) => {
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (accessToken === undefined) {
    return undefined;
  }

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${accessToken}`);

  return { headers, processResponse };
};

/** Проверяет наличие userId и username в cookie запроса. */
export const hasPayload = (requestCookies: Pick<NextRequest["cookies"], "get">) =>
  requestCookies.get(USER_ID_COOKIE_NAME) !== undefined &&
  requestCookies.get(USERNAME_COOKIE_NAME) !== undefined;

/** Проверяет, что access token отсутствует, а refresh token есть. */
export const isExpired = (requestCookies: Pick<NextRequest["cookies"], "get">) =>
  requestCookies.get(ACCESS_TOKEN_COOKIE_NAME) === undefined &&
  requestCookies.get(REFRESH_TOKEN_COOKIE_NAME) !== undefined;

/** Обновляет токены по refresh token или очищает сессию при неудаче. */
export const refresh = async (
  requestCookies: Pick<NextRequest["cookies"], "get">,
  responseCookies: Pick<NextResponse["cookies"], "set" | "delete">,
) => {
  const refreshToken = requestCookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  if (refreshToken !== undefined) {
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${refreshToken}`);

    const result = await refreshRequest({ headers });

    if (result.status === 200) {
      set(responseCookies, result.data);
      return;
    }
  }

  clear(responseCookies);
};

type ProcessResponse = NonNullable<ApiRequestInit["processResponse"]>;

/** Повторяет запрос с новым access token, если прежний истёк во время обращения к API. */
const processResponse: ProcessResponse = async (response, url, options) => {
  if (response.status !== 401) {
    return response;
  }

  const data = await response.clone().json() as { message?: string };

  if (data?.message !== "Authorization token expired") {
    return response;
  }

  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  if (refreshToken === undefined) {
    return response;
  }

  const refreshHeaders = new Headers();
  refreshHeaders.set("Authorization", `Bearer ${refreshToken}`);

  const refreshResponse = await refreshRequest({ headers: refreshHeaders });

  if (refreshResponse.status !== 200) {
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

/** Записывает токены сессии и данные пользователя, если они есть в ответе. */
export const set = (
  responseCookies: Pick<NextResponse["cookies"], "set">,
  data: Login200 | Register201 | Refresh200,
) => {
  responseCookies.set({
    ...COOKIE_CONFIG,
    httpOnly: true,
    name: ACCESS_TOKEN_COOKIE_NAME,
    maxAge: data.expiresIn - 30,
    value: data.accessToken,
  });

  responseCookies.set({
    ...COOKIE_CONFIG,
    httpOnly: true,
    name: REFRESH_TOKEN_COOKIE_NAME,
    value: data.refreshToken,
  });

  if ("user" in data) {
    responseCookies.set({
      ...COOKIE_CONFIG,
      name: USER_ID_COOKIE_NAME,
      value: String(data.user.id),
    });

    responseCookies.set({
      ...COOKIE_CONFIG,
      name: USERNAME_COOKIE_NAME,
      value: data.user.username,
    });
  }
};
