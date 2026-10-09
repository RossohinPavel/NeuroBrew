import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import * as v from "valibot";
import { ENV } from "@/common/env";
import * as jwt from "./jwt";
import * as payload from "./payload";


const AccessTokenPayloadSchema = v.object({
  userId: v.number(),
});

const RefreshTokenPayloadSchema = v.object({
  userId: v.number(),
});

/** Описывает данные, необходимые для авторизации по access-токену. */
export type AccessTokenPayload = v.InferInput<typeof AccessTokenPayloadSchema>;

/** Описывает данные, необходимые для выпуска новой пары токенов. */
export type RefreshTokenPayload = v.InferInput<typeof RefreshTokenPayloadSchema>;

/** Создаёт HMAC-ключ для подписи и проверки токенов сессии. */
const createCryptoKey = (secret: string) => {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
};

/** Содержит параметры подписи и срока действия access-токена. */
const ACCESS_TOKEN_CONFIG = {
  expirationTime: "15m",
  key: await createCryptoKey(ENV.JWT_ACCESS_SECRET),
  headers: {
    alg: "HS256",
    typ: "JWT",
  },
  options: {
    algorithms: ["HS256"],
    typ: "JWT",    
  },
} as const satisfies jwt.JWTParams;

/** Содержит параметры подписи и срока действия refresh-токена. */
const REFRESH_TOKEN_CONFIG = {
  expirationTime: "30d",
  key: await createCryptoKey(ENV.JWT_REFRESH_SECRET),
  headers: {
    alg: "HS256",
    typ: "JWT",
  },
  options: {
    algorithms: ["HS256"],
    typ: "JWT",    
  },
} as const satisfies jwt.JWTParams;

/** Создаёт access-токен с настройками срока действия и подписи сессии. */
export const createAccessToken = async (payload: AccessTokenPayload) => {
  return jwt.createToken(payload, ACCESS_TOKEN_CONFIG);
};

/** Создаёт refresh-токен с настройками срока действия и подписи сессии. */
export const createRefreshToken = async (payload: RefreshTokenPayload) => {
  return jwt.createToken(payload, REFRESH_TOKEN_CONFIG);
};

/** Представляет полностью проверенный payload либо классифицированную ошибку токена. */
type VerifyResult <T extends v.GenericSchema> = 
  | Extract<jwt.JWTVerifyResult, { status: "expired" | "jwtError" }>
  | payload.PayloadParseResult<T>;

/** Последовательно проверяет JWT и соответствие его payload прикладной схеме. */
const verifyToken = async <T extends v.GenericSchema>(
  jwtParams: jwt.JWTParams,
  schema: T,
  token: string,
): Promise<VerifyResult<T>> => {
  const jwtVerifyResult = await jwt.verifyToken(token, jwtParams);
  if (jwtVerifyResult.status === "valid") {
    return await payload.parse(schema, jwtVerifyResult.payload);
  }
  return jwtVerifyResult;
};

/** Проверяет access-токен и возвращает типизированный payload авторизации. */
export const verifyAccessToken = (token: string) => {
  return verifyToken(ACCESS_TOKEN_CONFIG, AccessTokenPayloadSchema, token);
};

/** Проверяет refresh-токен и возвращает payload для обновления сессии. */
export const verifyRefreshToken = (token: string) => {
  return verifyToken(REFRESH_TOKEN_CONFIG, RefreshTokenPayloadSchema, token);
};

/** Содержит имя доверенного заголовка для передачи сессии внутри приложения. */
const SESSION_USER_ID_HEADER = "x-session-user-id";

/** Удаляет недоверенный контекст сессии из переданных заголовков. */
export const sanitize = (headers: Headers) => {
  headers.delete(SESSION_USER_ID_HEADER);
};

/** Передаёт проверенный идентификатор пользователя через внутренний заголовок. */
export const set = (headers: Headers, payload: AccessTokenPayload) => {
  headers.set(SESSION_USER_ID_HEADER, String(payload.userId));
};

/** Возвращает подтверждённую сессию текущего запроса, если она установлена. */
export const get = cache(async () => {
  const headerStore = await headers();
  const userId = headerStore.get(SESSION_USER_ID_HEADER);
  if (userId === null) {
    return;
  }
  return { userId: Number(userId) } satisfies AccessTokenPayload;
});

/** Возвращает подтверждённую сессию или перенаправляет пользователя на страницу входа. */
export const require = cache(async () => {
  const session = await get();
  if (session === undefined) {
    redirect("/login");
  }
  return session;
});
