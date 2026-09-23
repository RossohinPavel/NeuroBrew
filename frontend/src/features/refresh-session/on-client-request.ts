import { JWT, Payload } from "@/entities/session";


type Token = string | undefined;

/** Указывает, что сессию запрещено обновлять. */
export class ForbiddenError extends Error {
  readonly status = 403;

  constructor() {
    super("Forbidden");
  }
}

/** Указывает, что срок действия сессии истёк. */
export class ExpiredError extends Error {
  readonly status = 401;

  constructor() {
    super("Token expired");
  }
}

/** Обновляет пару токенов сессии для запроса интерактивного клиента. */
export const onClientRequest = async (accessToken: Token, refreshToken: Token) => {
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
    } else if (JWT.isExpired(refreshResult)) {
      throw new ExpiredError();
    }
  }
  throw new ForbiddenError();
};
