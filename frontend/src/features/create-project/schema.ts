import * as v from "valibot";


const reservedProjectNames = new Set(["settings"]);

/** Проверяет данные формы создания проекта. */
export const CreateProjectFormSchema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(128),
    v.regex(/^[A-Za-z0-9-]+$/), // Разрешает только латинские буквы, цифры и дефис.
    v.regex(/^(?!-)(?!.*--)(?!.*-$)/), // Разрешает одиночный дефис только внутри имени.
    v.check(
      (name) => !reservedProjectNames.has(name.toLowerCase()),
      "This project name is reserved.",
    ),
  ),
});

export type CreateProjectFormData = v.InferInput<typeof CreateProjectFormSchema>;
