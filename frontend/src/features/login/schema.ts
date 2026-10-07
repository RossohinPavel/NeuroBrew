import * as v from "valibot";


/** Проверяет данные формы входа в аккаунт. */
export const LoginFormSchema = v.object({
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

export type LoginFormData = v.InferInput<typeof LoginFormSchema>;
