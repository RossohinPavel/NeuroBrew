import type { JWTPayload } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ENV } from "@/settings";
import { createToken } from "./jwt";


const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: ENV.NODE_ENV === "production",
  sameSite: "lax" as const,
};

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
  cookieStore.set("access-token", accessToken, { ...COOKIE_OPTIONS, path: "/" });
  cookieStore.set("refresh-token", refreshToken, { ...COOKIE_OPTIONS, path: "/auth/refresh" });
  redirect("/");
};
