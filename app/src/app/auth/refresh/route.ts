import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWT } from "@/common/libs";
import { CookieConf, createToken, parsePayload, verifyToken } from "@/entities/session";


/** Обновляет сессию по запросу браузера. */
export const GET = async (request: NextRequest) => {
  const redirectTo = request.cookies.get(CookieConf.callbackTo.name)?.value ?? "/";
  const response = NextResponse.redirect(new URL(redirectTo, request.url));
  response.cookies.delete(CookieConf.callbackTo);
  const refreshTokenString = request.cookies.get(CookieConf.refreshToken.name)?.value;
  let isAccessTokenRefreshed = false;
  if (refreshTokenString) {
    const refreshToken = await verifyToken("refresh", refreshTokenString);
    if (JWT.isValid(refreshToken)) {
      const payload = parsePayload(refreshToken);
      if (payload.success) {
        const accessTokenString = await createToken("access", payload.output);
        response.cookies.set({ ...CookieConf.accessToken, value: accessTokenString });
        isAccessTokenRefreshed = true;
      }
    }
  }
  if (!isAccessTokenRefreshed) {
    response.cookies.delete(CookieConf.accessToken);
    response.cookies.delete(CookieConf.refreshToken);
  }
  return response;
};

/** Обновляет сессию по запросу интерактивного клиента. */
export const POST = async (request: NextRequest) => {
  let response: NextResponse | null = null;
  const refreshTokenString = request.cookies.get(CookieConf.refreshToken.name)?.value;
  if (refreshTokenString) {
    const refreshToken = await verifyToken("refresh", refreshTokenString);
    if (JWT.isValid(refreshToken)) {
      const payload = parsePayload(refreshToken);
      if (payload.success) {
        const accessTokenString = await createToken("access", payload.output);
        response = new NextResponse("OK", { status: 201 });
        response.cookies.set({ ...CookieConf.accessToken, value: accessTokenString });
      }
    } else if (JWT.isExpired(refreshToken)) {
      response = new NextResponse("Token expired", { status: 401 });
    }
  }
  if (response === null) {
    response = new NextResponse("Forbidden", { status: 403 });
  }
  if (response.status !== 201) {
    response.cookies.delete(CookieConf.accessToken);
    response.cookies.delete(CookieConf.refreshToken);
  }
  return response;
};
