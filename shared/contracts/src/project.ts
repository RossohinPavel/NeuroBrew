import * as v from "valibot";
import { ProjectNameInputSchema, UsernameInputSchema } from "./fields.js";

export const ProjectGetRequestSchema = v.object({
  username: UsernameInputSchema,
  projectName: ProjectNameInputSchema,
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
  username: v.optional(UsernameInputSchema),
});
export type ProjectListRequest = v.InferInput<typeof ProjectListRequestSchema>;

export const ProjectListResponseSchema = v.array(ProjectResponseSchema);
export type ProjectListResponse = v.InferOutput<typeof ProjectListResponseSchema>;

export const CreateProjectRequestSchema = v.object({ name: ProjectNameInputSchema });

export type CreateProjectRequest = v.InferInput<typeof CreateProjectRequestSchema>;
