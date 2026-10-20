import * as v from "valibot";

// Имя допускает только латинские буквы, цифры и одиночные дефисы внутри имени.
// Проверка через regex сохраняется при преобразовании схемы в JSON Schema.
export const CreateProjectRequestSchema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(128),
    v.regex(/^(?!-)(?!.*--)(?!.*-$)[A-Za-z0-9-]+$/),
  ),
});

export type CreateProjectRequest = v.InferInput<typeof CreateProjectRequestSchema>;
