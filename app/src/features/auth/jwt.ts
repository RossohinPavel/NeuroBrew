import "server-only";

import { SignJWT, jwtVerify } from "jose";
import type { JWTHeaderParameters, JWTPayload, JWTVerifyOptions } from "jose";
import { ENV } from "@/settings";
import type { TokenConfig, TokenType } from "./types";


const JWT_PROTECTED_HEADER: JWTHeaderParameters = {
  alg: "HS256",
  typ: "JWT",
};

const JWT_VERIFY_OPTIONS: JWTVerifyOptions = {
  algorithms: ["HS256"],
  typ: "JWT",
};

// NOTE: В качестве оптимизации можно заранее создать CryptoKey и переиспользовать их.
const TOKEN_CONFIG: Record<TokenType, TokenConfig> = {
  "access-token": {
    secret: new TextEncoder().encode(ENV.JWT_ACCESS_SECRET),
    expirationTime: "15m",
  },
  "refresh-token": {
    secret: new TextEncoder().encode(ENV.JWT_REFRESH_SECRET),
    expirationTime: "7d",
  },
};

/** Создает подписанный JWT указанного вида с соответствующим сроком действия. */
export const createToken = (type: TokenType, payload: JWTPayload) => {
  const { secret, expirationTime } = TOKEN_CONFIG[type];
  return new SignJWT(payload)
    .setProtectedHeader(JWT_PROTECTED_HEADER)
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(secret);
};

/** Проверяет JWT указанного вида и возвращает его содержимое. */
export const verifyToken = async (type: TokenType, token: string) => {
  const { secret } = TOKEN_CONFIG[type];
  const result = await jwtVerify(token, secret, JWT_VERIFY_OPTIONS);
  return result.payload;
};
