import * as v from "valibot";


export const AgentsmdGetRequestSchema = v.object({
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
export type AgentsmdGetRequest = v.InferInput<typeof AgentsmdGetRequestSchema>;

export const AgentsmdResponseSchema = v.object({
  id: v.pipe(
    v.number(),
    v.integer(),
  ),
  projectId: v.pipe(
    v.number(),
    v.integer(),
  ),
  content: v.string(),
});
export type AgentsmdResponse = v.InferOutput<typeof AgentsmdResponseSchema>;
