import "server-only";

import { errors, jwtVerify, SignJWT } from "jose";
import type { JWTHeaderParameters, JWTPayload, JWTVerifyOptions } from "jose";
import { ENV } from "@/common/config";


const PARAMS: JWTHeaderParameters = {
  alg: "HS256",
  typ: "JWT",
};

const OPTIONS: JWTVerifyOptions = {
  algorithms: ["HS256"],
  typ: "JWT",
};

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

/** Содержит параметры подписи и срока действия токенов сессии. */
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

export type TokenType = keyof typeof TOKEN_CONFIG;
export type VerifyResult = JWTPayload | Error;

/** Создаёт токен пользовательской сессии указанного типа. */
export const create = (type: TokenType, payload: JWTPayload) => {
  const config = TOKEN_CONFIG[type];
  return new SignJWT(payload)
    .setProtectedHeader(PARAMS)
    .setIssuedAt()
    .setExpirationTime(config.expirationTime)
    .sign(config.key);
};

/** Возвращает payload проверенного токена сессии или ошибку верификации. */
export const verify = async (type: TokenType, token: string): Promise<VerifyResult> => {
  const config = TOKEN_CONFIG[type];
  try {
    const { payload } = await jwtVerify(token, config.key, OPTIONS);
    return payload;
  } catch (error) {
    return error as Error;
  }
};

/** Указывает, содержит ли результат верификации валидный payload. */
export const isValid = (result: VerifyResult): result is JWTPayload => {
  return !(result instanceof Error);
};

/** Указывает, завершилась ли верификация из-за истечения срока действия JWT. */
export const isExpired = (result: VerifyResult): result is errors.JWTExpired => {
  return result instanceof errors.JWTExpired;
};

/** Указывает, завершилась ли верификация общей ошибкой JWT. */
export const isJWTError = (result: VerifyResult): result is errors.JOSEError => {
  return result instanceof errors.JOSEError && !isExpired(result);
};

/** Указывает, завершилась ли верификация системной ошибкой. */
export const isSystemError = (result: VerifyResult): result is Error => {
  return result instanceof Error && !(result instanceof errors.JOSEError);
};
