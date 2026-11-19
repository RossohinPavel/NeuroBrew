import { type NextRequest, NextResponse } from "next/server";
import * as session from "@/entities/session";


/** Согласует состояние session cookie перед продолжением запроса. */
export const proxy = async (request: NextRequest) => {
  const response = NextResponse.next();

  if (!session.isCorrect(request.cookies)) {
    if (session.isExpired(request.cookies)) {
      // Refresh-токен позволяет восстановить сессию при отсутствии access-токена.
      await session.refresh(request.cookies, response.cookies);
    } else {
      // Неполную сессию удаляем из ответа перед продолжением запроса.
      session.clear(response.cookies);
    }
  }

  return response;
};
