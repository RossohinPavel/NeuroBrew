import * as v from "valibot";


export const projectsParamsSchema = v.object({
  profileId: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1),
    v.maxValue(2147483647), // Максимальное значение PostgreSQL integer для account.id.
  ),
});
export type ProjectsParams = v.InferOutput<typeof projectsParamsSchema>;

export const projectsQuerySchema = v.object({
  name: v.optional(v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(128),
  )),
});
export type ProjectsQuery = v.InferOutput<typeof projectsQuerySchema>;

export const projectResponseSchema = v.object({
  id: v.number(),
  accountId: v.number(),
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
  profileId: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1),
    v.maxValue(2147483647), // Максимальное значение PostgreSQL integer для account.id.
  ),
  id: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1),
    v.maxValue(2147483647), // Максимальное значение PostgreSQL integer для project.id.
  ),
});
export type ProjectParams = v.InferOutput<typeof projectParamsSchema>;
