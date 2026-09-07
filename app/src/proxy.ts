import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parsePayload, SessionCookie as SC, setAuthPayload, verifyToken } from "@/features/auth/service";
import * as JWT from "@/features/auth/jwt";


export const proxy = async (request: NextRequest) => {
  const accessTokenString = request.cookies.get(SC.accessToken.name)?.value;
  if (accessTokenString) {
    const accessToken = await verifyToken("access", accessTokenString);
    // Прерывает запрос при системной ошибке проверки access-токена.
    if (JWT.isSystemError(accessToken)) {
      // TODO: Реализовать логгирование ошибки.
      return new NextResponse("Internal Server Error", { status: 500 });
    }
    if (JWT.isExpired(accessToken)) {
      // Обновляет токен обычного запроса через редирект.
      if (request.method === "GET" || request.method === "HEAD") {
        const refreshUrl = new URL(SC.refreshToken.path, request.url);
        const response = NextResponse.redirect(refreshUrl);
        const callbackTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;
        response.cookies.set(SC.callbackTo.name, callbackTo, SC.callbackTo.config);
        return response;
      } else {
        // Рассчитано на Server Actions с методом POST и специальным заголовком next-action.
        return new NextResponse("Token expired", { status: 401 });
      }
    }
    let isAuthPayloadSet = false;
    if (JWT.isValid(accessToken)) {
      const payload = parsePayload(accessToken);
      if (payload.success) {
        const requestHeaders = new Headers(request.headers);
        setAuthPayload(requestHeaders, payload.output);
        isAuthPayloadSet = true;
        return NextResponse.next({ request: { headers: requestHeaders } });
      }
    }
    // Удаляет access-токен при ошибке JWT или невалидном payload.
    if (JWT.isJWTError(accessToken) || !isAuthPayloadSet) {
      const response = NextResponse.next();
      response.cookies.delete(SC.accessToken.name);
      return response;
    }
  }
  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Исключает:
     * - _next — внутренние ресурсы Next.js;
     * - __nextjs — служебные маршруты сервера разработки;
     * - .well-known — стандартизированные служебные файлы;
     * - assets — публичную статику приложения;
     * - favicon.ico — иконку сайта;
     * - robots.txt — правила для поисковых роботов;
     * - sitemap.xml — карту сайта;
     * - manifest.json и manifest.webmanifest — манифест веб-приложения.
     * - auth/refresh — маршрут обновления токенов сессии.
     */
    // eslint-disable-next-line @stylistic/max-len
    "/((?!_next(?:/|$)|__nextjs|\\.well-known(?:/|$)|assets(?:/|$)|favicon\\.ico$|robots\\.txt$|sitemap\\.xml$|manifest\\.(?:json|webmanifest)$|auth/refresh(?:/|$)).*)",
  ],
};
