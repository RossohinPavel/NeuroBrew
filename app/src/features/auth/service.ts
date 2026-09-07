import "server-only";

import { hash as argonHash, verify as argonVerify } from "argon2";
import type { JWTPayload } from "jose";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies, headers } from "next/headers";
import { cache } from "react";
import * as v from "valibot";
import { ENV } from "@/settings";
import * as JWT from "./jwt";


// Работа с паролем.

/** Предоставляет операции хеширования и проверки паролей. */
export const Password = {
  /** Создаёт хеш переданного пароля. */
  hash(password: string) {
    return argonHash(password);
  },

  /** Проверяет соответствие пароля сохранённому хешу. */
  verify(hash: string, password: string) {
    return argonVerify(hash, password);
  },
};


// Работа с JWT-токенами.

/** Создаёт криптографический ключ из секрета для подписи и проверки JWT. */
const createCryptoKey = (secret: string) => {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
};

const TOKEN_CONFIG = {
  access: {
    expirationTime: "30m",
    key: await createCryptoKey(ENV.JWT_ACCESS_SECRET),
  },
  refresh: {
    expirationTime: "7d",
    key: await createCryptoKey(ENV.JWT_REFRESH_SECRET),
  },
};

const TokenPayloadSchema = v.object({
  userId: v.number(),
});

export type TokenPayload = v.InferOutput<typeof TokenPayloadSchema>;

export type TokenType = "access" | "refresh";

/** Создаёт токен пользовательской сессии указанного типа. */
export const createToken = (type: TokenType, payload: TokenPayload) => {
  const config = TOKEN_CONFIG[type];
  return JWT.create(payload, config.expirationTime, config.key);
};

/** Проверяет токен пользовательской сессии указанного типа. */
export const verifyToken = (type: TokenType, token: string) => {
  const config = TOKEN_CONFIG[type];
  return JWT.verify(token, config.key);
};

/** Безопасно проверяет JWT payload и возвращает результат преобразования в payload приложения. */
export const parsePayload = (payload: JWTPayload) => {
  return v.safeParse(TokenPayloadSchema, payload);
};

// Работа с сессионными cookie.

const COMMON_CONFIG: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: ENV.NODE_ENV === "production",
  sameSite: "lax",
};

/** Описывает cookie с токенами пользовательской сессии. */
export const SessionCookie = {
  accessToken: {
    name: "access-token",
    path: "/",
    config: { ...COMMON_CONFIG, path: "/" },
  },
  refreshToken: {
    name: "refresh-token",
    path: "/auth/refresh",
    config: { ...COMMON_CONFIG, path: "/auth/refresh" },
  },
  callbackTo: {
    name: "callback-to",
    path: "/auth/refresh",
    config: { ...COMMON_CONFIG, path: "/auth/refresh", maxAge: 60 },
  },
} as const;

/** Создаёт токены сессии пользователя и сохраняет их в cookie. */
export const createSession = async (payload: TokenPayload) => {
  const [accessToken, refreshToken] = await Promise.all([
    createToken("access", payload),
    createToken("refresh", payload),
  ]);
  const cookieStore = await cookies();
  cookieStore.set(SessionCookie.accessToken.name, accessToken, SessionCookie.accessToken.config);
  cookieStore.set(SessionCookie.refreshToken.name, refreshToken, SessionCookie.refreshToken.config);
};

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
  return { userId: Number(userId) } as TokenPayload;
});
