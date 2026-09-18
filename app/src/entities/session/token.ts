import "server-only";

import { ENV } from "@/common/config";
import { JWT } from "@/common/libs";
import type { TokenPayload } from "./payload";


/** Создаёт криптографический ключ из секрета для подписи и проверки JWT. */
const createCryptoKey = (secret: string) => {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
};

const TOKEN_CONFIG = {
  access: {
    expirationTime: "30m",
    key: await createCryptoKey(ENV.JWT_ACCESS_SECRET),
  },
  refresh: {
    expirationTime: "30d",
    key: await createCryptoKey(ENV.JWT_REFRESH_SECRET),
  },
};

export type TokenType = "access" | "refresh";

/** Создаёт токен пользовательской сессии указанного типа. */
export const createToken = (type: TokenType, payload: TokenPayload) => {
  const config = TOKEN_CONFIG[type];
  return JWT.create(payload, config.expirationTime, config.key);
};

/** Проверяет токен пользовательской сессии указанного типа. */
export const verifyToken = (type: TokenType, token: string) => {
  const config = TOKEN_CONFIG[type];
  return JWT.verify(token, config.key);
};
