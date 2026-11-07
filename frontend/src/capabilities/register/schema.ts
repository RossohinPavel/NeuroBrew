import { RegisterRequestSchema } from "@shared/contracts";
import * as v from "valibot";


/** Проверяет клиентскую форму регистрации, включая подтверждение пароля. */
export const RegisterFormSchema = v.pipe(
  v.object({
    ...RegisterRequestSchema.entries,
    passwordConfirmation: v.string(),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["passwordConfirmation"]],
      ({ password, passwordConfirmation }) => password === passwordConfirmation,
      "Passwords do not match.",
    ),
    ["passwordConfirmation"],
  ),
);

export type RegisterFormData = v.InferInput<typeof RegisterFormSchema>;
