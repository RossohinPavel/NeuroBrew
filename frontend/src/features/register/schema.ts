import * as v from "valibot";


const reservedUsernames = new Set(["login", "logout", "register", "settings"]);

/** Проверяет данные, необходимые серверу для регистрации пользователя. */
export const RegisterDataSchema = v.object({
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
    v.check(
      (username) => !reservedUsernames.has(username.toLowerCase()),
      "Это имя пользователя зарезервировано.",
    ),
  ),
});

/** Проверяет клиентскую форму регистрации, включая подтверждение пароля. */
export const RegisterFormSchema = v.pipe(
  v.object({
    ...RegisterDataSchema.entries,
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

export type RegisterData = v.InferInput<typeof RegisterDataSchema>;
export type RegisterFormData = v.InferInput<typeof RegisterFormSchema>;
