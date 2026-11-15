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

export const CreateChangelogRequestSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(128),
  ),
});

export const CreateChangelogResponseSchema = v.object({
  id: v.number(),
  createdAt: v.pipe(
    v.string(),
    v.isoTimestamp(),
  ),
  title: v.string(),
});

export type ListChangelogResponse = v.InferOutput<typeof ListChangelogResponseSchema>;
export type CreateChangelogRequest = v.InferInput<typeof CreateChangelogRequestSchema>;
export type CreateChangelogResponse = v.InferOutput<typeof CreateChangelogResponseSchema>;
