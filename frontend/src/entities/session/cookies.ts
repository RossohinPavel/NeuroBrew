import "server-only";

import { ENV } from "@/common/env";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";


const COMMON_CONFIG: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: ENV.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

/** Задаёт имена и общие параметры cookie для хранения токенов сессии. */
const Cookies = {
  accessToken: {
    ...COMMON_CONFIG,
    name: "access-token",
  },
  refreshToken: {
    ...COMMON_CONFIG,
    name: "refresh-token",
  },
} as const;

export default Cookies;
