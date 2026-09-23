import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Cookies } from "@/entities/session";
import {
  ExpiredError,
  ForbiddenError,
  onClientRequest,
  onNavigation,
} from "@/features/refresh-session";


/** Обновляет сессию при навигации и возвращает пользователя на исходную страницу. */
export const GET = async (request: NextRequest) => {
  const redirectTo = request.cookies.get(Cookies.callbackTo.name)?.value ?? "/";
  const response = NextResponse.redirect(new URL(redirectTo, request.url));
  response.cookies.delete(Cookies.callbackTo);
  const tokens = await onNavigation(
    request.cookies.get(Cookies.accessToken.name)?.value,
    request.cookies.get(Cookies.refreshToken.name)?.value,
  );
  if (tokens) {
    response.cookies.set({ ...Cookies.accessToken, value: tokens.accessToken });
    response.cookies.set({ ...Cookies.refreshToken, value: tokens.refreshToken });
  } else {
    response.cookies.delete(Cookies.accessToken);
    response.cookies.delete(Cookies.refreshToken);
  }
  return response;
};

/** Обновляет сессию по запросу интерактивного клиента и сообщает результат статусом ответа. */
export const POST = async (request: NextRequest) => {
  try {
    const tokens = await onClientRequest(
      request.cookies.get(Cookies.accessToken.name)?.value,
      request.cookies.get(Cookies.refreshToken.name)?.value,
    );
    const response = new NextResponse("OK", { status: 201 });
    response.cookies.set({ ...Cookies.accessToken, value: tokens.accessToken });
    response.cookies.set({ ...Cookies.refreshToken, value: tokens.refreshToken });
    return response;
  } catch (error) {
    if (error instanceof ExpiredError || error instanceof ForbiddenError) {
      const response = new NextResponse(error.message, { status: error.status });
      response.cookies.delete(Cookies.accessToken);
      response.cookies.delete(Cookies.refreshToken);
      return response;
    }
    throw error;
  }
};
