import * as v from "valibot";

export const EmailInputSchema = v.pipe(
  v.string(),
  v.email(),
);

// Имя проекта допускает латинские буквы, цифры и одиночные дефисы внутри имени.
// Проверка через regex сохраняется при преобразовании схемы в JSON Schema.
export const ProjectNameInputSchema = v.pipe(
  v.string(),
  v.maxLength(128),
  v.regex(/^(?!-)(?!.*--)(?!.*-$)[A-Za-z0-9-]+$/),
);

// Имя пользователя допускает латинские буквы, цифры и одиночные дефисы внутри имени.
export const UsernameInputSchema = v.pipe(
  v.string(),
  v.maxLength(64),
  v.regex(/^(?!-)(?!.*--)(?!.*-$)[A-Za-z0-9-]+$/),
);
