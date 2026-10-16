import "server-only";

import { refresh } from "@/common/api/generated/endpoints";
import { ENV } from "@/common/env";
import { cookies } from "next/headers";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";


const COMMON_CONFIG: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: ENV.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

/** Задаёт имена и общие параметры cookie для хранения токенов сессии. */
export const Cookies = {
  accessToken: {
    ...COMMON_CONFIG,
    name: "access-token",
  },
  refreshToken: {
    ...COMMON_CONFIG,
    name: "refresh-token",
  },
} as const;

/** Описывает данные ответа, необходимые для управления сессией. */
type SessionResponse = {
  data: unknown;
  status: number;
};

/** Определяет ответ об истечении access-токена. */
const isAuthorizationTokenExpired = (response: SessionResponse) => {
  return (
    response.status === 401
    && typeof response.data === "object"
    && response.data !== null
    && "message" in response.data
    && response.data.message === "Authorization token expired"
  );
};

/** Выполняет API-метод с access-токеном и инициирует обновление истёкшей сессии. */
export const withSession = <A extends unknown[], R extends Promise<SessionResponse>>(
  request: (...args: [...A, options?: RequestInit]) => R,
  options?: RequestInit,
) => {
  return async (...args: A) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(Cookies.accessToken.name)?.value;
    const headers = new Headers(options?.headers);

    if (accessToken !== undefined) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    const requestOptions = { ...options, headers};
    const response = await request(...args, requestOptions);

    if (isAuthorizationTokenExpired(response)) {
      const refreshToken = cookieStore.get(Cookies.refreshToken.name)?.value;
      if (refreshToken !== undefined) {
        const refreshResponse = await refreshSession(refreshToken);
        if (refreshResponse?.status === 200) {
          headers.set("Authorization", `Bearer ${refreshResponse.data.accessToken}`);
          return request(...args, requestOptions);
        }
      }
    }
    return response;
  };
};

/** Запрашивает обновление сессии с помощью refresh-токена. */
const refreshSession = async (refreshToken: string) => {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${refreshToken}`);
  return refresh({ headers });
};
