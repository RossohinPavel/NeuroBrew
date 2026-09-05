import type { JWTPayload } from "jose";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ENV } from "@/settings";
import { createToken } from "./jwt";


const COOKIE_OPTIONS: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: ENV.NODE_ENV === "production",
  sameSite: "lax",
};

const ACCESS_COOKIE: Partial<ResponseCookie> = { ...COOKIE_OPTIONS, path: "/" };
const REFRESH_COOKIE: Partial<ResponseCookie> = { ...COOKIE_OPTIONS, path: "/auth/refresh" };

interface AuthenticateUserPayload extends JWTPayload {
  sub: string;
}

/** Завершает аутентификацию пользователя. */
export const authenticateUser = async (payload: AuthenticateUserPayload) => {
  const [accessToken, refreshToken] = await Promise.all([
    createToken("access", payload),
    createToken("refresh", payload),
  ]);
  const cookieStore = await cookies();
  cookieStore.set("access-token", accessToken, ACCESS_COOKIE);
  cookieStore.set("refresh-token", refreshToken, REFRESH_COOKIE);
  redirect("/");
};
