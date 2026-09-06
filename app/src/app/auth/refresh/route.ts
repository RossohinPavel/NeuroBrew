import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SessionCookie } from "@/features/auth/cookie";
import { Token } from "@/features/auth/jwt";


/** Обновляет сессию по запросу браузера. */
export const GET = async (request: NextRequest) => {
  const cookieStore = request.cookies;
  const sessionCookie = new SessionCookie(cookieStore);
  const refreshTokenString = sessionCookie.getToken("refresh-token");
  if (refreshTokenString) {
    const refreshToken = await new Token("refresh").verify(refreshTokenString);
    if (!refreshToken.hasError()) {
      const accessToken = await new Token("access").create(refreshToken.getPayload());
      sessionCookie.setToken("access-token", accessToken.getToken());
    }
  }
  const { searchParams } = request.nextUrl;
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  return NextResponse.redirect(new URL(callbackUrl, request.url));
};

/** Обновляет сессию по запросу интерактивного клиента. */
export const POST = async (request: NextRequest) => {
  const cookieStore = request.cookies;
  const sessionCookie = new SessionCookie(cookieStore);
  const refreshTokenString = sessionCookie.getToken("refresh-token");
  if (refreshTokenString) {
    const refreshToken = await new Token("refresh").verify(refreshTokenString);
    if (!refreshToken.hasError()) {
      const accessToken = await new Token("access").create(refreshToken.getPayload());
      sessionCookie.setToken("access-token", accessToken.getToken());
      return new Response(null, { status: 201 });
    }
  }
  return new Response("Token expired", { status: 401 });
};
