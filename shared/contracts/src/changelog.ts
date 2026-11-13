import * as v from "valibot";


export const ListChangelogResponseSchema = v.array(
  v.object({
    id: v.number(),
    createdAt: v.pipe(
      v.string(),
      v.isoTimestamp(),
    ),
    title: v.string(),
  }),
);

export type ListChangelogResponse = v.InferOutput<typeof ListChangelogResponseSchema>;
