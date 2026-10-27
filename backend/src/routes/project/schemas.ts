import * as v from "valibot";


export const projectsQuerySchema = v.object({
  username: v.optional(v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(64),
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

