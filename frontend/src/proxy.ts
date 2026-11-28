import { type NextRequest, NextResponse } from "next/server";
import * as session from "@/entities/session";


/** Согласует состояние session cookie перед продолжением запроса. */
export const proxy = async (request: NextRequest) => {
  const response = NextResponse.next();

  if (
    session.hasPayload(request.cookies) 
    && session.isExpired(request.cookies)
  ) {
    await session.refresh(request.cookies, response.cookies);
  } else if (
    !session.hasPayload(request.cookies) 
    || !session.hasTokens(request.cookies)
  ) {
    session.clear(response.cookies);
  }

  return response;
};
