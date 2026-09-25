import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Cookies, JWT, Payload } from "@/entities/session";


/**
 * У nextjs интересное поведение. Составление http-ответа и рендер страницы запускаются паралелльно.
 * Это крутая оптимизация, но приводит к неочевидному поведению: статус запроса в встроенном логгере
 * зависит от того, как отрендерится страницы. 
 * Например, тут есть ветка для обработки системной ошибки. Лог для нее мы не увидим, так как 
 * некст вообще не успеет собрать какую-нибудь страницу перед тем, как вернуть ошибку.
 * При разработке еще заметил такое: у нас на токен-экспайред возвращается редирект. Мы ожидаем
 * увидеть 307 в логе, но там 200. Страница успела отрендериться успшено, поэтому 200. А вот роут 
 * на обновление токена корректно возвращает 307, так как там выполняется редирект прямо во время 
 * рендера страницы.
 * @param request 
 * @returns 
 */
export const proxy = async (request: NextRequest) => {
  const accessTokenString = request.cookies.get(Cookies.accessToken.name)?.value;
  if (accessTokenString) {
    const accessToken = await JWT.verify("access", accessTokenString);
    // Прерывает запрос при системной ошибке проверки access-токена.
    if (JWT.isSystemError(accessToken)) {
      // TODO: Реализовать логгирование ошибки.
      return new NextResponse("Internal Server Error", { status: 500 });
    }
    if (JWT.isExpired(accessToken)) {
      // Обновляет токен обычного запроса через редирект.
      if (request.method === "GET" || request.method === "HEAD") {
        const refreshUrl = new URL(Cookies.refreshToken.path, request.url);
        const response = NextResponse.redirect(refreshUrl);
        const callbackTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;
        response.cookies.set({ ...Cookies.callbackTo, value: callbackTo });
        return response;
      } else {
        // Рассчитано на Server Actions с методом POST и специальным заголовком next-action.
        return new NextResponse("Token expired", { status: 401 });
      }
    }
    let isSessionSet = false;
    if (JWT.isValid(accessToken)) {
      const payload = Payload.parseJWT(accessToken);
      if (payload.success) {
        const requestHeaders = new Headers(request.headers);
        Payload.writeToHeaders(requestHeaders, payload.output);
        isSessionSet = true;
        return NextResponse.next({ request: { headers: requestHeaders } });
      }
    }
    // Удаляет access-токен при ошибке JWT или невалидном payload.
    if (JWT.isJWTError(accessToken) || !isSessionSet) {
      const response = NextResponse.next();
      response.cookies.delete(Cookies.accessToken);
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
    "/((?!_next(?:/|$)|__nextjs|\\.well-known(?:/|$)|assets(?:/|$)|favicon\\.ico$|robots\\.txt$|sitemap\\.xml$|manifest\\.(?:json|webmanifest)$|refresh(?:/|$)).*)",
  ],
};
