import * as v from "valibot";

// Регулярные выражения ограничивают пароль печатными ASCII-символами без пробелов
// и требуют буквы обоих регистров и цифру, а в имени пользователя разрешают
// латинские буквы, цифры и одиночный дефис только внутри имени.
export const RegisterRequestSchema = v.object({
  email: v.pipe(
    v.string(),
    v.email(),
  ),
  password: v.pipe(
    v.string(),
    v.minLength(8),
    v.maxLength(128),
    v.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\x21-\x7E]+$/),
  ),
  username: v.pipe(
    v.string(),
    v.maxLength(64),
    v.regex(/^(?!-)(?!.*--)(?!.*-$)[A-Za-z0-9-]+$/),
  ),
});

export type RegisterRequest = v.InferInput<typeof RegisterRequestSchema>;

export const LoginRequestSchema = v.object({
  email: v.pipe(
    v.string(),
    v.email(),
  ),
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
