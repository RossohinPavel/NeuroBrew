import type { JWTPayload } from "jose";


export type TokenType = "access-token" | "refresh-token";

export interface TokenConfig {
  secret: Uint8Array;
  expirationTime: string;
}

export interface CreateAuthSessionPayload extends JWTPayload {
  sub: string;
}
