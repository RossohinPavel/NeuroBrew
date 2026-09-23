import { JWT, Payload } from "@/entities/session";


type Token = string | undefined;

/** Обновляет пару токенов сессии для навигационного запроса. */
export const onNavigation = async (accessToken: Token, refreshToken: Token) => {
  if (refreshToken !== undefined && accessToken !== undefined) {
    const refreshResult = await JWT.verify("refresh", refreshToken);
    if (JWT.isValid(refreshResult)) {
      const payload = Payload.parseJWT(refreshResult);
      if (payload.success) {
        return {
          accessToken: await JWT.create("access", payload.output),
          refreshToken,
        };
      }
    }
  }
  return null;
};
