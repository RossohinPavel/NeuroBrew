import "server-only";

import { errors, SignJWT, jwtVerify } from "jose";
import type { JWTHeaderParameters, JWTPayload, JWTVerifyOptions } from "jose";


const PARAMS: JWTHeaderParameters = {
  alg: "HS256",
  typ: "JWT",
};

/** Создаёт и подписывает JWT с переданным payload. */
export const create = (payload: JWTPayload, expirationTime: string, key: CryptoKey) => {
  return new SignJWT(payload)
    .setProtectedHeader(PARAMS)
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(key);
};

export type VerifyResult = JWTPayload | Error;

const OPTIONS: JWTVerifyOptions = {
  algorithms: ["HS256"],
  typ: "JWT",
};

/** Возвращает payload проверенного JWT или ошибку верификации. */
export const verify = async (token: string, key: CryptoKey): Promise<VerifyResult> => {
  try {
    const { payload } = await jwtVerify(token, key, OPTIONS);
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
