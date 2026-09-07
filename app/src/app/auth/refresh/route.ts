import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as JWT from "@/features/auth/jwt";
import { createToken, parsePayload, SessionCookie as SC, verifyToken } from "@/features/auth/service";


/** Обновляет сессию по запросу браузера. */
export const GET = async (request: NextRequest) => {
  const redirectTo = request.cookies.get(SC.callbackTo.name)?.value ?? "/";
  const response = NextResponse.redirect(new URL(redirectTo, request.url));
  response.cookies.delete(SC.callbackTo.name);
  const refreshTokenString = request.cookies.get(SC.refreshToken.name)?.value;
  let isAccessTokenRefreshed = false;
  if (refreshTokenString) {
    const refreshToken = await verifyToken("refresh", refreshTokenString);
    if (JWT.isValid(refreshToken)) {
      const payload = parsePayload(refreshToken);
      if (payload.success) {
        const accessTokenString = await createToken("access", payload.output);
        response.cookies.set(SC.accessToken.name, accessTokenString, SC.accessToken.config);
        isAccessTokenRefreshed = true;
      }
    }
  }
  if (!isAccessTokenRefreshed) {
    response.cookies.delete({ name: SC.accessToken.name, path: SC.accessToken.path });
    response.cookies.delete({ name: SC.refreshToken.name, path: SC.refreshToken.path });
  }
  return response;
};

/** Обновляет сессию по запросу интерактивного клиента. */
export const POST = async (request: NextRequest) => {
  let response: NextResponse | null = null;
  const refreshTokenString = request.cookies.get(SC.refreshToken.name)?.value;
  if (refreshTokenString) {
    const refreshToken = await verifyToken("refresh", refreshTokenString);
    if (JWT.isValid(refreshToken)) {
      const payload = parsePayload(refreshToken);
      if (payload.success) {
        const accessTokenString = await createToken("access", payload.output);
        response = new NextResponse("OK", { status: 201 });
        response.cookies.set(SC.accessToken.name, accessTokenString, SC.accessToken.config);
      }
    } else if (JWT.isExpired(refreshToken)) {
      response = new NextResponse("Token expired", { status: 401 });
    }
  }
  if (response === null) {
    response = new NextResponse("Forbidden", { status: 403 });
  }
  if (response.status !== 201) {
    response.cookies.delete({ name: SC.accessToken.name, path: SC.accessToken.path });
    response.cookies.delete({ name: SC.refreshToken.name, path: SC.refreshToken.path });
  }
  return response;
};
