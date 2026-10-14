import * as v from "valibot";


export const healthOkResponseSchema = v.object({
  status: v.literal("ok"),
  services: v.object({
    backend: v.literal("ok"),
    postgres: v.literal("ok"),
  }),
});

export const healthErrorResponseSchema = v.object({
  status: v.literal("error"),
  services: v.object({
    backend: v.picklist(["ok", "error"]),
    postgres: v.picklist(["ok", "error"]),
  }),
});

export type HealthResponse =
  | v.InferOutput<typeof healthOkResponseSchema>
  | v.InferOutput<typeof healthErrorResponseSchema>;
