import "server-only";

import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ENV } from "@/common/config";


const COMMON_CONFIG: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: ENV.NODE_ENV === "production",
  sameSite: "lax",
};

/** Описывает cookie с токенами пользовательской сессии. */
export const CookieConf = {
  accessToken: {
    name: "access-token",
    path: "/",
    ...COMMON_CONFIG,
  },
  refreshToken: {
    name: "refresh-token",
    path: "/auth/refresh",
    ...COMMON_CONFIG,
  },
  callbackTo: {
    name: "callback-to",
    path: "/auth/refresh",
    maxAge: 60,
    ...COMMON_CONFIG,
  },
} as const;
