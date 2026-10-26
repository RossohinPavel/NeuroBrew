import * as v from "valibot";
import { postgresIdSchema } from "../../schemas/index.js";


export const agentsmdParamsSchema = v.object({
  profileId: postgresIdSchema,
  projectId: postgresIdSchema,
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
