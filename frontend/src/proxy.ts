import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as Session from "@/entities/session";
import { refreshSession } from "./features/refresh-session";


/** Направляет запрос к соответствующей проверке сессии. */
export const proxy = async (request: NextRequest): Promise<NextResponse> => {
  const headers = new Headers(request.headers);
  Session.sanitize(headers);
  const accessTokenString = request.cookies.get(Session.cookies.accessToken.name)?.value;
  if (accessTokenString) {
    const accessToken = await Session.verifyAccessToken(accessTokenString);
    if (accessToken.status === "valid") {
      Session.set(headers, accessToken.payload);
      return NextResponse.next({ request: { headers } });
    }
    if (accessToken.status === "expired") {
      const refreshTokenString = request.cookies.get(Session.cookies.refreshToken.name)?.value;
      if (refreshTokenString) {
        const result = await refreshSession(refreshTokenString);
        if (result) {
          Session.set(headers, result.session);
          const response = NextResponse.next({ request: { headers } });
          response.cookies.set({ ...Session.cookies.accessToken, value: result.accessToken });
          response.cookies.set({ ...Session.cookies.refreshToken, value: result.refreshToken });
          return response;
        }
      }
    }
    // Тут ошибки обработки токенов. Чтобы не спамило - удаляем из браузера клиента.
    const response = NextResponse.next({ request: { headers } });
    response.cookies.delete(Session.cookies.accessToken);
    response.cookies.delete(Session.cookies.refreshToken);
    return response;
  }
  return NextResponse.next({ request: { headers } });
};
