import * as v from "valibot";


export const agentsmdParamsSchema = v.object({
  projectId: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1),
    v.maxValue(2147483647),
  ),
});
export type AgentsmdParams = v.InferOutput<typeof agentsmdParamsSchema>;

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
