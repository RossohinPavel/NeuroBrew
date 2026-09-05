import "server-only";

import { SignJWT, jwtVerify } from "jose";
import type { JWTHeaderParameters, JWTPayload, JWTVerifyOptions } from "jose";
import { ENV } from "@/settings";


const JWT_ALGORITHM = "HS256";

const JWT_PROTECTED_HEADER: JWTHeaderParameters = {
  alg: JWT_ALGORITHM,
  typ: "JWT",
};

const JWT_VERIFY_OPTIONS: JWTVerifyOptions = {
  algorithms: [JWT_ALGORITHM],
  typ: "JWT",
};

type TokenType = "access" | "refresh";

interface TokenConfig {
  secret: Uint8Array;
  expirationTime: string;
}

// NOTE: В качестве оптимизации можно заранее создать CryptoKey и переиспользовать их.
const ACCESS_TOKEN_CONFIG: TokenConfig = {
  secret: new TextEncoder().encode(ENV.JWT_ACCESS_SECRET),
  expirationTime: "15m",
};

const REFRESH_TOKEN_CONFIG: TokenConfig = {
  secret: new TextEncoder().encode(ENV.JWT_REFRESH_SECRET),
  expirationTime: "7d",
};

const TOKEN_CONFIG: Record<TokenType, TokenConfig> = {
  access: ACCESS_TOKEN_CONFIG,
  refresh: REFRESH_TOKEN_CONFIG,
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
