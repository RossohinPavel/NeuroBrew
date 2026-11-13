import * as v from "valibot";


export const PassSchema = v.object({
  status: v.literal("pass"),
});

export const FailSchema = v.object({
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
    backend: v.union([PassSchema, FailSchema]),
    postgres: v.union([PassSchema, FailSchema]),
    redis: v.union([PassSchema, FailSchema]),
  }),
});

export type LiveResponse = v.InferOutput<typeof LiveResponseSchema>;
