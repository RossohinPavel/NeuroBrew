import "server-only";

import { errors, SignJWT, jwtVerify } from "jose";
import type { JWTHeaderParameters, JWTPayload, JWTVerifyOptions } from "jose";
import { ENV } from "@/settings";


export type TokenType = "access" | "refresh";

export interface TokenPayload {
  userId: number;
}

/** Управляет JWT указанного типа. */
export class Token {
  private static readonly params = {
    alg: "HS256",
    typ: "JWT",
  } as const satisfies JWTHeaderParameters;

  private static readonly options = {
    algorithms: ["HS256"],
    typ: "JWT",
  } as const satisfies JWTVerifyOptions;

  // NOTE: В качестве оптимизации можно заранее создать CryptoKey и переиспользовать их.
  private static readonly secrets = {
    access: new TextEncoder().encode(ENV.JWT_ACCESS_SECRET),
    refresh: new TextEncoder().encode(ENV.JWT_REFRESH_SECRET),
  } as const;

  static readonly expirationTimes = {
    access: "30m",
    refresh: "7d",
  } as const;

  private _error?: errors.JOSEError;
  private _payload?: TokenPayload;
  private _rawPayload?: JWTPayload;
  private _token?: string;

  constructor(readonly type: TokenType) {}

  async create(payload: TokenPayload) {
    this._payload = payload;
    this._token = await new SignJWT(payload as unknown as JWTPayload)
      .setProtectedHeader(Token.params)
      .setIssuedAt()
      .setExpirationTime(Token.expirationTimes[this.type])
      .sign(Token.secrets[this.type]);
    return this;
  }

  /** Возвращает строку токена или выбрасывает ошибку, если она недоступна. */
  getToken() {
    if (!this._token) {
      throw new Error("Token is unavailable");
    }
    return this._token;
  }

  async verify(token: string) {
    this._token = token;
    this._payload = undefined;
    this._rawPayload = undefined;
    this._error = undefined;
    try {
      const verification = await jwtVerify(token, Token.secrets[this.type], Token.options);
      this._rawPayload = verification.payload;
    } catch (error) {
      this._error = error as errors.JOSEError;
    }
    return this;
  }

  /** Указывает, завершилась ли проверка токена ошибкой. */
  hasError() {
    return this._error !== undefined;
  }

  /** Указывает, истек ли токен или приблизился ли он к истечению на заданный порог секунд. */
  hasExpired(threshold = 0) {
    if (this._error instanceof errors.JWTExpired) {
      return true;
    }
    const expirationTime = this._rawPayload?.exp;
    if (typeof expirationTime !== "number") {
      return false;
    }
    return expirationTime - Date.now() / 1000 <= threshold;
  }

  /** Возвращает payload или выбрасывает ошибку, если он недоступен. */
  getPayload() {
    if (this._rawPayload) {
      const { userId } = this._rawPayload;
      this._payload = { userId } as TokenPayload;
    }
    if (!this._payload) {
      throw new Error("Token payload is unavailable");
    }
    return this._payload;
  }
}
