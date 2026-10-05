import "server-only";

import { errors, jwtVerify, SignJWT } from "jose";
import type { JWTHeaderParameters, JWTPayload, JWTVerifyOptions, KeyInput } from "jose";


/** Определяет параметры подписи, срока действия и проверки JWT. */
export interface JWTParams {
  expirationTime: string,
  key: KeyInput,
  headers: JWTHeaderParameters,
  options: JWTVerifyOptions
}

/** Создаёт подписанный JWT из payload и переданных криптографических параметров. */
export const createToken = async (payload: JWTPayload, params: JWTParams) => {
  const token = await new SignJWT(payload)
    .setProtectedHeader(params.headers)
    .setIssuedAt()
    .setExpirationTime(params.expirationTime)
    .sign(params.key);
  return token;
};

/** Представляет проверенный JWT либо классифицированную ошибку его проверки. */
export type JWTVerifyResult =
  | { status: "valid"; payload: JWTPayload }
  | { status: "expired"; error: errors.JWTExpired }
  | { status: "jwtError"; error: errors.JOSEError }
  | { status: "systemError"; error: Error };

/** Проверяет JWT и классифицирует ошибки срока действия, формата и выполнения. */
export const verifyToken = async (token: string, params: JWTParams): Promise<JWTVerifyResult> => {
  try {
    const { payload } = await jwtVerify(token, params.key, params.options);
    return { status: "valid", payload };
  } catch (error) {
    if (error instanceof errors.JWTExpired) {
      return { status: "expired", error };
    }
    if (error instanceof errors.JOSEError) {
      return { status: "jwtError", error };
    }
    return { status: "systemError", error: error as Error };
  }
};
