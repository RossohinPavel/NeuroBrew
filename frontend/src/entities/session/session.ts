import "server-only";

import { refresh } from "@/common/api/generated/endpoints";
import { cookies } from "next/headers";
import { Cookies as SessionCookies } from "./cookies";

/** Описывает данные ответа, необходимые для управления сессией. */
type SessionResponse = {
  data?: {
    message?: string;
  };
  status?: number;
};

/** Определяет ответ об истечении access-токена. */
const isAuthorizationTokenExpired = (response: SessionResponse) => {
  return (
    response.status === 401
    && response.data?.message === "Authorization token expired"
  );
};

/** Выполняет API-метод с access-токеном и инициирует обновление истёкшей сессии. */
export const withSession = <A extends unknown[], R extends Promise<{status: number}>>(
  request: (...args: [...A, options?: RequestInit]) => R,
  options?: RequestInit,
) => {
  return async (...args: A) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(SessionCookies.accessToken.name)?.value;

    if (accessToken === undefined) {
      throw new Error("Authentication is required to perform this action.");
    }

    const headers = new Headers(options?.headers);
    headers.set("Authorization", `Bearer ${accessToken}`);

    const requestOptions = { ...options, headers};
    const response = await request(...args, requestOptions);

    if (isAuthorizationTokenExpired(response)) {
      const refreshToken = cookieStore.get(SessionCookies.refreshToken.name)?.value;
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
