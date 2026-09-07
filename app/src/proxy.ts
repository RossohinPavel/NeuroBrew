import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenExpiringSoon, SessionCookie } from "@/features/auth/service";
import { verifyToken } from "@/features/auth/jwt";


export const proxy = async (request: NextRequest) => {
  const accessTokenString = request.cookies.get(SessionCookie.accessToken.name)?.value;
  if (accessTokenString) {
    const accessToken = await verifyToken("access", accessTokenString);
    // Удаляет access-токен при ошибке его проверки.
    if (accessToken.isMalformed() || accessToken.isSystemError()) {
      const response = NextResponse.next();
      response.cookies.delete(SessionCookie.accessToken.name);
      return response;
    }
    if (accessToken.isExpired() || isTokenExpiringSoon(accessToken, 60)) {
      // Обновляет токен обычного запроса через редирект.
      if (request.method === "GET" || request.method === "HEAD") {
        const refreshUrl = new URL(SessionCookie.refreshToken.path, request.url);
        const response = NextResponse.redirect(refreshUrl);
        const callbackTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;
        response.cookies.set(SessionCookie.callbackTo.name, callbackTo, SessionCookie.callbackTo.config);
        return response;
      }
      // Отклоняет Server Action, если токен истёк или скоро истечёт.
      if (request.method === "POST" && request.headers.has("next-action")) {
        return new NextResponse("Token expired", { status: 401 });
      }
    }
    if (accessToken.isValid()) {
      // TODO: Здесь можно записать payload токена в заголовки.
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
