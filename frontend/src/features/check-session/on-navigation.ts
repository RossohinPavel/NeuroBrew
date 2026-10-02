import "server-only";

import { NextResponse } from "next/server";
import { Cookies, JWT, Payload } from "@/entities/session";
import type { NextRequest } from "next/server";


/** Проверяет сессию при навигационном запросе. */
export const onNavigation = async (request: NextRequest, headers: Headers) => {
  const accessTokenString = request.cookies.get(Cookies.accessToken.name)?.value;
  if (accessTokenString) {
    const accessToken = await JWT.verify("access", accessTokenString);
    if (JWT.isExpired(accessToken)) {
      const refreshUrl = new URL(Cookies.refreshToken.path, request.url);
      const response = NextResponse.redirect(refreshUrl);
      const callbackTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;
      response.cookies.set({ ...Cookies.callbackTo, value: callbackTo });
      return response;
    }
    if (JWT.isValid(accessToken)) {
      const payload = await Payload.parseJWT(accessToken);
      if (payload.success) {
        Payload.writeToHeaders(headers, payload.output);
        return NextResponse.next({ request: { headers } });
      }
    }
    const response = NextResponse.next({ request: { headers } });
    response.cookies.delete(Cookies.accessToken);
    response.cookies.delete(Cookies.refreshToken);
    return response;
  }
  return NextResponse.next({ request: { headers } });
};
