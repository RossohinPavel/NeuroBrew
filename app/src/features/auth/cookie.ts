import "server-only";

import type { RequestCookies, ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { ENV } from "@/settings";


export type SessionCookieType = "access-token" | "refresh-token";

/** Предоставляет доступ к токенам пользовательской сессии в cookie store. */
export class SessionCookie {
  private static readonly commonOptions: Partial<ResponseCookie> = {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "lax",
  };

  static readonly accessToken = { name: "access-token", path: "/" } as const;
  static readonly refreshPath = "/auth/refresh";

  static readonly options: Record<SessionCookieType, Partial<ResponseCookie>> = {
    "access-token": { ...SessionCookie.commonOptions, path: SessionCookie.accessToken.path },
    "refresh-token": { ...SessionCookie.commonOptions, path: SessionCookie.refreshPath },
  };

  constructor(private readonly cookieStore: RequestCookies | ReadonlyRequestCookies) {}

  /** Возвращает значение токена указанного типа из cookie store. */
  getToken(type: SessionCookieType) {
    return this.cookieStore.get(type)?.value;
  }

  /** Удаляет токен указанного типа из cookie store. */
  clearToken(type: SessionCookieType) {
    const { path } = SessionCookie.options[type];
    this.cookieStore.set(type, "", { maxAge: 0, path });
    return this;
  }

  /** Сохраняет токен указанного типа в cookie store. */
  setToken(type: SessionCookieType, token: string) {
    this.cookieStore.set(type, token, SessionCookie.options[type]);
    return this;
  }
}
