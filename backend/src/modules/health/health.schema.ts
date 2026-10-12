import * as v from "valibot";


export const HealthSchema = v.object({
  backend: v.literal("ok"),
  database: v.picklist(["ready", "unavailable"]),
});

export type Health = v.InferOutput<typeof HealthSchema>;
