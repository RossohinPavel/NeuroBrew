import * as v from "valibot";

export const RegisterRequestSchema = v.object({
  email: v.pipe(
    v.string(),
    v.email(),
  ),
  password: v.pipe(
    v.string(),
    v.minLength(8),
    v.maxLength(128),
    v.regex(/^[\x21-\x7E]+$/), // Разрешает только печатные ASCII-символы без пробелов.
    v.regex(/[a-z]/), // Требует хотя бы одну строчную латинскую букву.
    v.regex(/[A-Z]/), // Требует хотя бы одну заглавную латинскую букву.
    v.regex(/[0-9]/), // Требует хотя бы одну цифру.
  ),
  username: v.pipe(
    v.string(),
    v.maxLength(64),
    v.regex(/^[A-Za-z0-9-]+$/), // Разрешает только латинские буквы, цифры и дефис.
    v.regex(/^(?!-)(?!.*--)(?!.*-$)/), // Разрешает одиночный дефис только внутри имени.
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
