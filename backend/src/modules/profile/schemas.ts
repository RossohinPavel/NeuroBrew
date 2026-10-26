import * as v from "valibot";


export const ProfilesQuerySchema = v.object({
  email: v.optional(v.pipe(
    v.string(),
    v.email(),
  )),
  username: v.optional(v.pipe(
    v.string(),
    v.minLength(1),
  )),
});

export type ProfilesQuery = v.InferOutput<typeof ProfilesQuerySchema>;

export const ProfileResponseSchema = v.object({
  id: v.number(),
  email: v.pipe(
    v.string(),
    v.email(),
  ),
  username: v.string(),
  createdAt: v.pipe(
    v.string(),
    v.isoTimestamp(),
  ),
});

export const ProfilesResponseSchema = v.array(ProfileResponseSchema);

export type ProfilesResponse = v.InferOutput<typeof ProfilesResponseSchema>;
