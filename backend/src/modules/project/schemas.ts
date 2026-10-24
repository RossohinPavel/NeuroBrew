import * as v from "valibot";
import { postgresIdSchema } from "../../schemas/index.js";


export const projectsParamsSchema = v.object({ profileId: postgresIdSchema });
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
  profileId: postgresIdSchema,
  id: postgresIdSchema,
});
export type ProjectParams = v.InferOutput<typeof projectParamsSchema>;
