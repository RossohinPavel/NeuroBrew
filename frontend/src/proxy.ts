import { type NextRequest, NextResponse } from "next/server";
import * as Session from "@/entities/session";


/** Согласует состояние session cookie перед продолжением запроса. */
export const proxy = async (request: NextRequest) => {
  const accessToken = request.cookies.get(Session.Cookies.accessToken.name)?.value;
  const refreshToken = request.cookies.get(Session.Cookies.refreshToken.name)?.value;
  const response = NextResponse.next();

  // Без refresh-токена сессию нельзя продлить, поэтому сбрасываем её неполное состояние.
  if (accessToken !== undefined && refreshToken === undefined) {
    response.cookies.delete(Session.Cookies.accessToken);
    response.cookies.delete(Session.Cookies.refreshToken);

    return response;
  }

  // Refresh-токен позволяет восстановить сессию при отсутствии access-токена.
  if (accessToken === undefined && refreshToken !== undefined) {
    const result = await Session.refreshSession(refreshToken);

    if (result.status === 200) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken, expiresIn } = result.data;
      const accessTokenCookie = Session.createAccessTokenCookie(newAccessToken, expiresIn);
      const refreshTokenCookie = Session.createRefreshTokenCookie(newRefreshToken);

      response.cookies.set(accessTokenCookie);
      response.cookies.set(refreshTokenCookie);
    } else {
      response.cookies.delete(Session.Cookies.accessToken);
      response.cookies.delete(Session.Cookies.refreshToken);
    }
  }

  return response;
};
