import "server-only";

import * as Session from "@/entities/session";


interface RefreshedSession {
  session: Session.AccessTokenPayload,
  accessToken: string,
  refreshToken: string
}

export const refreshSession = async (
  refreshTokenString: string,
): Promise<RefreshedSession | undefined> => {
  // Пока на этапе разработки реализация примитивная. Ее нужно усилять.
  const refreshToken = await Session.verifyRefreshToken(refreshTokenString);
  if (refreshToken.status === "valid") {
    const session = { userId: refreshToken.payload.userId };
    return {
      session,
      accessToken: await Session.createAccessToken(session),
      refreshToken: refreshTokenString,
    };
  }
};