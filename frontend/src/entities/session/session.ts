import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import type { ApiRequestInit } from "@/shared/api/fetcher";
import { refresh as refreshRequest } from "@/shared/api/generated/endpoints";
import type { Login200, Refresh200, Register201 } from "@/shared/api/generated/models";
import { ENV } from "@/shared/env";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import type { NextRequest, NextResponse } from "next/server";


const ACCESS_TOKEN_COOKIE_NAME = "access-token";
const REFRESH_TOKEN_COOKIE_NAME = "refresh-token";
const USERNAME_COOKIE_NAME = "username";
const USER_ID_COOKIE_NAME = "user-id";
const COOKIE_CONFIG: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: ENV.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

/** Удаляет cookie сессии из хранилища для записи. */
export const clear = (responseCookies: Pick<NextResponse["cookies"], "delete">) => {
  responseCookies
    .delete(ACCESS_TOKEN_COOKIE_NAME)
    .delete(REFRESH_TOKEN_COOKIE_NAME)
    .delete(USERNAME_COOKIE_NAME)
    .delete(USER_ID_COOKIE_NAME);
};

type AuthenticatedSessionResult = {
  payload: { 
    userId: number; 
    username: string 
  };
  apiOptions: ApiRequestInit;
};

type UnauthenticatedSessionResult = {
  payload: undefined;
  apiOptions: undefined;
};

type SessionResult = AuthenticatedSessionResult | UnauthenticatedSessionResult;

/** Возвращает данные текущей сессии и настройки запросов к API. */
export const get = cache(async (): Promise<SessionResult> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const userId = Number(cookieStore.get(USER_ID_COOKIE_NAME)?.value);
  const username = cookieStore.get(USERNAME_COOKIE_NAME)?.value;

  if (
    accessToken === undefined ||
    username === undefined ||
    !Number.isSafeInteger(userId)
  ) {
    return { payload: undefined, apiOptions: undefined };
  }

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${accessToken}`);

  return {
    payload: { userId, username },
    apiOptions: { headers, processResponse },
  };
});

/** Возвращает текущую сессию или сообщает, что пользователь не авторизован. */
export const getOrThrow = async () => {
  const session = await get();

  if (session.payload === undefined) {
    throw new Error("Authentication is required to perform this action.");
  }

  return session;
};

/** Проверяет наличие токенов, username и userId в cookie запроса. */
export const isCorrect = (requestCookies: Pick<NextRequest["cookies"], "get">) =>
  requestCookies.get(ACCESS_TOKEN_COOKIE_NAME) !== undefined &&
  requestCookies.get(REFRESH_TOKEN_COOKIE_NAME) !== undefined &&
  requestCookies.get(USER_ID_COOKIE_NAME) !== undefined &&
  requestCookies.get(USERNAME_COOKIE_NAME) !== undefined;

/** Проверяет, что access token отсутствует, а остальные cookie сессии есть. */
export const isExpired = (requestCookies: Pick<NextRequest["cookies"], "get">) =>
  requestCookies.get(ACCESS_TOKEN_COOKIE_NAME) === undefined &&
  requestCookies.get(REFRESH_TOKEN_COOKIE_NAME) !== undefined &&
  requestCookies.get(USER_ID_COOKIE_NAME) !== undefined &&
  requestCookies.get(USERNAME_COOKIE_NAME) !== undefined;

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
    name: ACCESS_TOKEN_COOKIE_NAME,
    maxAge: data.expiresIn - 30,
    value: data.accessToken,
  });

  responseCookies.set({
    ...COOKIE_CONFIG,
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
