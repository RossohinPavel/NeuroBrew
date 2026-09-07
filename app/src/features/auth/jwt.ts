import "server-only";

import { errors, SignJWT, jwtVerify } from "jose";
import type { JWTHeaderParameters, JWTPayload, JWTVerifyOptions } from "jose";
import { ENV } from "@/settings";


export type TokenType = "access" | "refresh";

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

const KEYS: Record<TokenType, CryptoKey> = {
  access: await createCryptoKey(ENV.JWT_ACCESS_SECRET),
  refresh: await createCryptoKey(ENV.JWT_REFRESH_SECRET),
};

const EXPIRATION_TIMES: Record<TokenType, string> = {
  access: "30m",
  refresh: "7d",
};

/** Создаёт JWT указанного типа с переданным payload. */
export const createToken = async (type: TokenType, payload: JWTPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader(PARAMS)
    .setIssuedAt()
    .setExpirationTime(EXPIRATION_TIMES[type])
    .sign(KEYS[type]);
};

/** Проверяет JWT и возвращает объект с результатом проверки. */
export const verifyToken = async (type: TokenType, token: string) => {
  try {
    const verification = await jwtVerify(token, KEYS[type], OPTIONS);
    return new Token("valid", verification.payload);
  } catch (error) {
    if (error instanceof errors.JWTExpired) {
      return new Token("expired", error.payload, error);
    }
    if (error instanceof errors.JOSEError) {
      return new Token("malformed", undefined, error);
    }
    return new Token("system_error", undefined, error as Error);
  }
};

export class Token {
  constructor(
    readonly status: "valid" | "expired" | "malformed" | "system_error",
    readonly payload?: JWTPayload,
    readonly error?: Error,
  ) {}

  /** Указывает, прошёл ли токен проверку. */
  isValid(): this is Token & { status: "valid"; payload: JWTPayload } {
    return this.status === "valid";
  }

  /** Указывает, истёк ли срок действия токена. */
  isExpired(): this is Token & { status: "expired"; payload: JWTPayload; error: Error } {
    return this.status === "expired";
  }

  /** Указывает, является ли токен некорректным. */
  isMalformed(): this is Token & { status: "malformed"; error: Error } {
    return this.status === "malformed";
  }

  /** Указывает, завершилась ли проверка системной ошибкой. */
  isSystemError(): this is Token & { status: "system_error"; error: Error } {
    return this.status === "system_error";
  }
}
