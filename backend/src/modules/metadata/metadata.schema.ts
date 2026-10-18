import * as v from "valibot";


export const changelogResponseSchema = v.array(
  v.object({
    id: v.number(),
    createdAt: v.pipe(
      v.string(),
      v.isoTimestamp(),
    ),
    title: v.string(),
  }),
);

export type ChangelogResponse = v.InferOutput<typeof changelogResponseSchema>;
