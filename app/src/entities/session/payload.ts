import "server-only";

import type { JWTPayload } from "jose";
import * as v from "valibot";


const TokenPayloadSchema = v.object({
  userId: v.number(),
});

export type TokenPayload = v.InferOutput<typeof TokenPayloadSchema>;

/** Безопасно проверяет JWT payload и возвращает результат преобразования в payload приложения. */
export const parsePayload = (payload: JWTPayload) => {
  return v.safeParse(TokenPayloadSchema, payload);
};
