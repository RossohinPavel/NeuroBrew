import * as v from "valibot";


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
