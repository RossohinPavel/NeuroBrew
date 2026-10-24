import * as v from "valibot";
import { postgresIdSchema } from "../../schemas/index.js";


export const ProfileParamsSchema = v.object({ id: postgresIdSchema });

export type ProfileParams = v.InferOutput<typeof ProfileParamsSchema>;

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

export type ProfileResponse = v.InferOutput<typeof ProfileResponseSchema>;

export const ProfilesResponseSchema = v.array(ProfileResponseSchema);

export type ProfilesResponse = v.InferOutput<typeof ProfilesResponseSchema>;
