import "server-only";

import { headers } from "next/headers";
import { cache } from "react";
import type { TokenPayload } from "./payload";


const AUTH_USER_ID_HEADER = "x-auth-user-id";

/** Устанавливает служебные заголовки с данными аутентифицированного пользователя. */
export const setAuthPayload = (headers: Headers, payload: TokenPayload) => {
  headers.set(AUTH_USER_ID_HEADER, String(payload.userId));
};

/** Возвращает данные аутентифицированного пользователя из служебных заголовков запроса. */
export const getAuthPayload = cache(async () => {
  const headerStore = await headers();
  const userId = headerStore.get(AUTH_USER_ID_HEADER);
  if (userId === null) return null;
  return { userId: Number(userId) };
});
