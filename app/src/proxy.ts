import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SessionCookie } from "@/features/auth/cookie";
import { Token } from "@/features/auth/jwt";


export const proxy = async (request: NextRequest) => {
  const cookieStore = request.cookies;
  const accessTokenString = new SessionCookie(cookieStore).getToken("access-token");
  // Продолжает запрос как гость при отсутствии access-токена.
  if (!accessTokenString) {
    return NextResponse.next();
  }
  const accessToken = await new Token("access").verify(accessTokenString);
  if (accessToken.hasExpired(60)) {
    // Обновляет токен обычного запроса через редирект.
    if (request.method === "GET" || request.method === "HEAD") {
      const refreshUrl = new URL(SessionCookie.refreshPath, request.url);
      const callbackUrl = `${request.nextUrl.pathname}${request.nextUrl.search}`;
      refreshUrl.searchParams.set("callbackUrl", callbackUrl);
      return NextResponse.redirect(refreshUrl);
    }
    // Отклоняет Server Action, если токен истёк или скоро истечёт.
    if (request.method === "POST" && request.headers.has("next-action")) {
      return new NextResponse("Token expired", { status: 401 });
    }
  }
  // Удаляет некорректный access-токен из cookies.
  if (accessToken.hasError()) {
    const response = NextResponse.next();
    response.cookies.delete(SessionCookie.accessToken);
    return response;
  }
  // TODO: Здесь можно записать payload токена в заголовки.
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
