import * as v from "valibot";


export const agentsmdListQuerySchema = v.object({
  projectId: v.optional(v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1),
    v.maxValue(2147483647),
  )),
});
export type AgentsmdListQuery = v.InferOutput<typeof agentsmdListQuerySchema>;

const agentsmdSchema = v.object({
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
export const agentsmdListResponseSchema = v.array(agentsmdSchema);
export type AgentsmdListResponse = v.InferOutput<typeof agentsmdListResponseSchema>;
