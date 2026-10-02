import { NextResponse } from "next/server";
import { Payload } from "@/entities/session";
import { onNavigation } from "@/features/check-session";
import type { NextRequest } from "next/server";


/** Направляет запрос к соответствующей проверке сессии. */
export const proxy = (request: NextRequest) => {
  const headers = Payload.sanitizeHeaders(request.headers);
  if (request.method === "GET" || request.method === "HEAD") {
    return onNavigation(request, headers);
  }
  return NextResponse.next({ request: { headers } });
};

export const config = {
  matcher: [
    /*
     * Исключает:
     * - _next — внутренние ресурсы Next.js;
     * - __nextjs — служебные маршруты сервера разработки;
     * - .well-а known — стандартизированные служебные файлы;
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
