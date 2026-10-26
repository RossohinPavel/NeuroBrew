import * as v from "valibot";


export const passSchema = v.object({
  status: v.literal("pass"),
});

export const failSchema = v.object({
  status: v.literal("fail"),
  output: v.string(),
});

export const LiveResponseSchema = v.object({
  status: v.picklist(["pass", "warn", "fail"]),
  timestamp: v.pipe(
    v.string(),
    v.isoTimestamp(),
  ),
  detail: v.object({
    backend: v.union([passSchema, failSchema]),
    postgres: v.union([passSchema, failSchema]),
  }),
});

export type LiveResponse = v.InferOutput<typeof LiveResponseSchema>;
