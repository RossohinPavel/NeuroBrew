import * as v from "valibot";
import * as fields from "./fields.js";

export const ProjectGetRequestSchema = v.object({
  username: fields.UsernameInputSchema,
  projectName: fields.ProjectNameInputSchema,
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
  username: v.optional(fields.UsernameInputSchema),
});
export type ProjectListRequest = v.InferInput<typeof ProjectListRequestSchema>;

export const ProjectListResponseSchema = v.array(ProjectResponseSchema);
export type ProjectListResponse = v.InferOutput<typeof ProjectListResponseSchema>;

export const CreateProjectRequestSchema = v.object({ name: fields.ProjectNameInputSchema });

export type CreateProjectRequest = v.InferInput<typeof CreateProjectRequestSchema>;
