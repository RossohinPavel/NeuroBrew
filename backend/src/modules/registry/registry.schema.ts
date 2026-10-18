import * as v from "valibot";


export const myProjectResponseSchema = v.object({
  id: v.number(),
  userId: v.number(),
  name: v.string(),
  createdAt: v.pipe(
    v.string(),
    v.isoTimestamp(),
  ),
});

export const myProjectsResponseSchema = v.array(myProjectResponseSchema);

export type MyProjectResponse = v.InferOutput<typeof myProjectResponseSchema>;
export type MyProjectsResponse = v.InferOutput<typeof myProjectsResponseSchema>;
