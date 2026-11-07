import { ENV } from "@/common/env";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";


const COMMON_CONFIG: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: ENV.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

/** Задаёт имена cookie для хранения токенов сессии. */
export const Cookies = {
  accessToken: { name: "access-token" },
  refreshToken: { name: "refresh-token" },
} as const;

/** Создаёт cookie для хранения access-токена. */
export const createAccessTokenCookie = (value: string, expiresIn: number) => ({
  ...COMMON_CONFIG,
  ...Cookies.accessToken,
  maxAge: Math.max(expiresIn - 30, 1),
  value,
});

/** Создаёт cookie для хранения refresh-токена. */
export const createRefreshTokenCookie = (value: string) => ({
  ...COMMON_CONFIG,
  ...Cookies.refreshToken,
  value,
});
