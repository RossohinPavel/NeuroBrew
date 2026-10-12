import { toJsonSchema } from "@valibot/to-json-schema";
import * as v from "valibot";


export const HealthSchema = v.object({
  backend: v.literal("ok"),
  database: v.picklist(["ready", "unavailable"]),
});

export const HealthJsonSchema = toJsonSchema(
  HealthSchema,
  { typeMode: "output", errorMode: "throw" },
);

export type Health = v.InferOutput<typeof HealthSchema>;
