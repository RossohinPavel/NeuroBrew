import * as v from "valibot";

export const ProjectGetRequestSchema = v.object({
  username: v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(64),
  ),
  projectName: v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(128),
  ),
});
export type ProjectGetRequest = v.InferInput<typeof ProjectGetRequestSchema>;

export const ProjectResponseSchema = v.object({
  id: v.number(),
  userId: v.number(),
  name: v.string(),
  createdAt: v.pipe(
    v.string(),
    v.isoTimestamp(),
  ),
});
export type ProjectResponse = v.InferOutput<typeof ProjectResponseSchema>;

export const ProjectListRequestSchema = v.object({
  mine: v.optional(v.boolean()),
  username: v.optional(v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(64),
  )),
});
export type ProjectListRequest = v.InferInput<typeof ProjectListRequestSchema>;

export const ProjectListResponseSchema = v.array(ProjectResponseSchema);
export type ProjectListResponse = v.InferOutput<typeof ProjectListResponseSchema>;

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
