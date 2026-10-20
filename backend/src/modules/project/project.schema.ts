import * as v from "valibot";


export const projectsQuerySchema = v.object({
  username: v.optional(v.pipe(
    v.string(),
    v.minLength(1),
  )),
  name: v.optional(v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(128),
  )),
  userId: v.optional(v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1),
    v.maxValue(2147483647), // Максимальное значение PostgreSQL integer для users.id.
  )),
});
export type ProjectsQuery = v.InferOutput<typeof projectsQuerySchema>;

export const projectResponseSchema = v.object({
  id: v.number(),
  userId: v.number(),
  name: v.string(),
  createdAt: v.pipe(
    v.string(),
    v.isoTimestamp(),
  ),
});
export type ProjectResponse = v.InferOutput<typeof projectResponseSchema>;

export const projectsResponseSchema = v.array(projectResponseSchema);
export type ProjectsResponse = v.InferOutput<typeof projectsResponseSchema>;

export const projectParamsSchema = v.object({
  id: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1),
    v.maxValue(2147483647), // Максимальное значение PostgreSQL integer для project.id.
  ),
});
export type ProjectParams = v.InferOutput<typeof projectParamsSchema>;

// Имя допускает только латинские буквы, цифры и одиночные дефисы внутри имени.
// Проверка через regex сохраняется при преобразовании схемы в JSON Schema.
export const createProjectRequestSchema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(128),
    v.regex(/^(?!-)(?!.*--)(?!.*-$)[A-Za-z0-9-]+$/),
  ),
});
export type CreateProjectRequest = v.InferOutput<typeof createProjectRequestSchema>;

// В будущем для моих проектов будет возвращаться больше информации, в том числе приватной.
export const myProjectResponseSchema = v.object({
  id: v.number(),
  userId: v.number(),
  name: v.string(),
  createdAt: v.pipe(
    v.string(),
    v.isoTimestamp(),
  ),
});
export type MyProjectResponse = v.InferOutput<typeof myProjectResponseSchema>;

export const myProjectsResponseSchema = v.array(myProjectResponseSchema);
export type MyProjectsResponse = v.InferOutput<typeof myProjectsResponseSchema>;
