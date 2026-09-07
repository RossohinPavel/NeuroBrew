import "server-only";

import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import * as v from "valibot";
import { ENV } from "@/settings";
import { createToken, type Token } from "./jwt";


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

const TokenPayloadSchema = v.object({
  userId: v.number(),
});

export type TokenPayload = v.InferOutput<typeof TokenPayloadSchema>;

/** Проверяет, истечёт ли валидный токен в пределах временного порога. */
export const isTokenExpiringSoon = (token: Token, window = 0) => {
  if (token.isValid() && token.payload.exp !== undefined) {
    return token.payload.exp <= (Date.now() / 1000 + window);
  }
  return false;
};

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
