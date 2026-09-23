import "server-only";

import type { JWTPayload } from "jose";
import { headers } from "next/headers";
import { cache } from "react";
import * as v from "valibot";


const AUTH_USER_ID_HEADER = "x-auth-user-id";

const SessionPayloadSchema = v.object({
  userId: v.number(),
});

export type SessionPayload = v.InferOutput<typeof SessionPayloadSchema>;

/** Безопасно проверяет JWT payload и возвращает результат преобразования в payload приложения. */
export const parseJWT = (payload: JWTPayload) => {
  return v.safeParse(SessionPayloadSchema, payload);
};

/** Записывает данные сессии в служебные заголовки запроса. */
export const writeToHeaders = (headers: Headers, payload: SessionPayload) => {
  headers.set(AUTH_USER_ID_HEADER, String(payload.userId));
};

/** Возвращает данные сессии из служебных заголовков запроса. */
export const readFromHeaders = cache(async (): Promise<SessionPayload | null> => {
  const headerStore = await headers();
  const userId = headerStore.get(AUTH_USER_ID_HEADER);
  if (userId === null) return null;
  return { userId: Number(userId) };
});
