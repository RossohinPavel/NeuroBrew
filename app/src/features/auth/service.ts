import type { JWTPayload } from "jose";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { cache } from "react";
import { ENV } from "@/settings";
import { createToken, verifyToken } from "./jwt";
import type { TokenType } from "./types";


const COOKIE_OPTIONS: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: ENV.NODE_ENV === "production",
  sameSite: "lax",
};

const ACCESS_COOKIE: Partial<ResponseCookie> = { ...COOKIE_OPTIONS, path: "/" };
const REFRESH_COOKIE: Partial<ResponseCookie> = { ...COOKIE_OPTIONS, path: "/auth/refresh" };

interface CreateAuthSessionPayload extends JWTPayload {
  sub: string;
}

/** Возвращает содержимое действительного токена текущей сессии или null. */
export const getAuthSession = cache(async (type: TokenType) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(type)?.value;
  if (!token) {
    return null;
  }
  try {
    return await verifyToken(type, token);
  } catch {
    return null;
  }
});

/** Создает сессию пользователя и сохраняет ее токены в cookies. */
export const createAuthSession = async (payload: CreateAuthSessionPayload) => {
  const [accessToken, refreshToken] = await Promise.all([
    createToken("access-token", payload),
    createToken("refresh-token", payload),
  ]);
  const cookieStore = await cookies();
  cookieStore.set("access-token", accessToken, ACCESS_COOKIE);
  cookieStore.set("refresh-token", refreshToken, REFRESH_COOKIE);
};
