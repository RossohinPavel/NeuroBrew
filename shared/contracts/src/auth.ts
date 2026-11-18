import * as v from "valibot";
import * as fields from "./fields.js";

export const RefreshResponseSchema = v.object({
  accessToken: v.string(),
  refreshToken: v.string(),
  tokenType: v.literal("Bearer"),
  expiresIn: v.number(),
});

// Данные текущего пользователя для ответа me и ответов авторизации.
export const CurrentUserResponseSchema = v.object({
  id: v.number(),
  email: v.string(),
  username: v.string(),
  createdAt: v.string(),
});

// Пароль ограничен печатными ASCII-символами без пробелов и требует буквы обоих регистров и цифру.
export const RegisterRequestSchema = v.object({
  email: fields.EmailInputSchema,
  password: v.pipe(
    v.string(),
    v.minLength(8),
    v.maxLength(128),
    v.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\x21-\x7E]+$/),
  ),
  username: fields.UsernameInputSchema,
});

export const RegisterResponseSchema = v.object({
  ...RefreshResponseSchema.entries,
  user: CurrentUserResponseSchema,
});

// Добавлять дополнительные проверки для пароля в схеме логина не имеет большого смысла. 
// Нам достаточно того, чтобы пользователь ввел какую-то строку. Сделано это именно для того, 
// чтобы облегчить поддержку кода в будущем. Нет смысла повторно проверять все бизнес-правила.
export const LoginRequestSchema = v.object({
  email: fields.EmailInputSchema,
  password: v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(128),
  ),
});

export type RefreshResponse = v.InferOutput<typeof RefreshResponseSchema>;
export type CurrentUserResponse = v.InferOutput<typeof CurrentUserResponseSchema>;
export type RegisterRequest = v.InferInput<typeof RegisterRequestSchema>;
export type RegisterResponse = v.InferOutput<typeof RegisterResponseSchema>;
export type LoginRequest = v.InferInput<typeof LoginRequestSchema>;
