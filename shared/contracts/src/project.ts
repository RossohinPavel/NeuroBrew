import * as v from "valibot";
import * as fields from "./fields.js";

export const GetProjectRequestSchema = v.object({
  username: fields.UsernameInputSchema,
  name: fields.ProjectNameInputSchema,
});

export const ProjectResponseSchema = v.object({
  id: v.number(),
  userId: v.number(),
  name: v.string(),
  createdAt: v.pipe(
    v.string(),
    v.isoTimestamp(),
  ),
});

export const ListProjectsRequestSchema = v.object({
  mine: v.optional(v.boolean()),
  username: v.optional(fields.UsernameInputSchema),
});

export const ListProjectsResponseSchema = v.array(ProjectResponseSchema);

export const CreateProjectRequestSchema = v.object({
  name: fields.ProjectNameInputSchema,
});

export type GetProjectRequest = v.InferInput<typeof GetProjectRequestSchema>;
export type ProjectResponse = v.InferOutput<typeof ProjectResponseSchema>;
export type ListProjectsRequest = v.InferInput<typeof ListProjectsRequestSchema>;
export type ListProjectsResponse = v.InferOutput<typeof ListProjectsResponseSchema>;
export type CreateProjectRequest = v.InferInput<typeof CreateProjectRequestSchema>;
