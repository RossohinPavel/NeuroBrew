import "server-only";

import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { cache } from "react";
import * as v from "valibot";
import type { JWTPayload } from "jose";


const AUTH_USER_ID_HEADER = "x-auth-user-id";

const SessionPayloadSchema = v.object({
  userId: v.number(),
});

export type SessionPayload = v.InferOutput<typeof SessionPayloadSchema>;

/** Асинхронно проверяет JWT payload и возвращает результат преобразования в payload приложения. */
export const parseJWT = (payload: JWTPayload) => {
  return v.safeParseAsync(SessionPayloadSchema, payload);
};

/** Записывает данные сессии в служебные заголовки запроса. */
export const writeToHeaders = (headers: Headers, payload: SessionPayload) => {
  headers.set(AUTH_USER_ID_HEADER, String(payload.userId));
};

/** Создаёт заголовки запроса без недоверенных данных сессии. */
export const sanitizeHeaders = (headers: Headers) => {
  const sanitizedHeaders = new Headers(headers);
  sanitizedHeaders.delete(AUTH_USER_ID_HEADER);
  return sanitizedHeaders;
};

/** Возвращает данные сессии из служебных заголовков запроса. */
export const get = cache(async (): Promise<SessionPayload | null> => {
  const headerStore = await headers();
  const userId = headerStore.get(AUTH_USER_ID_HEADER);
  if (userId === null) {
    return null;
  }
  return { userId: Number(userId) };
});

/** Возвращает данные сессии или отвечает страницей 404. */
export const getOr404 = cache(async () => {
  const payload = await get();
  if (payload === null) {
    notFound();
  }
  return payload;
});
