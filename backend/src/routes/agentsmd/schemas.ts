import * as v from "valibot";


export const agentsmdLookupQuerySchema = v.object({
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
export type AgentsmdLookupQuery = v.InferOutput<typeof agentsmdLookupQuerySchema>;

export const agentsmdResponseSchema = v.object({
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
export type AgentsmdResponse = v.InferOutput<typeof agentsmdResponseSchema>;
