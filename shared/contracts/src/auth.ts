import * as v from "valibot";
import { EmailInputSchema, UsernameInputSchema } from "./fields.js";

// Пароль ограничен печатными ASCII-символами без пробелов и требует
// буквы обоих регистров и цифру.
export const RegisterRequestSchema = v.object({
  email: EmailInputSchema,
  password: v.pipe(
    v.string(),
    v.minLength(8),
    v.maxLength(128),
    v.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\x21-\x7E]+$/),
  ),
  username: UsernameInputSchema,
});

export type RegisterRequest = v.InferInput<typeof RegisterRequestSchema>;

export const LoginRequestSchema = v.object({
  email: EmailInputSchema,
  password: v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(128),
  ),
});

export type LoginRequest = v.InferInput<typeof LoginRequestSchema>;

export const authTokensResponseSchema = v.object({
  accessToken: v.string(),
  refreshToken: v.string(),
  tokenType: v.literal("Bearer"),
  expiresIn: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1),
  ),
});

export type AuthTokensResponse = v.InferOutput<typeof authTokensResponseSchema>;
