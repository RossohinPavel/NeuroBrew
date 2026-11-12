import * as v from "valibot";

// Имя пользователя допускает латинские буквы, цифры и одиночные дефисы внутри имени.
export const UsernameInputSchema = v.pipe(
  v.string(),
  v.maxLength(64),
  v.regex(/^(?!-)(?!.*--)(?!.*-$)[A-Za-z0-9-]+$/),
);
