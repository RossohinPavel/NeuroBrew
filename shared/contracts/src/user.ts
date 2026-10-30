import * as v from "valibot";


export const UserGetQuerySchema = v.object({
  username: v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(64),
  ),
});

export type UserGetQuery = v.InferOutput<typeof UserGetQuerySchema>;

export const UserResponseSchema = v.object({
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

export type UserResponse = v.InferOutput<typeof UserResponseSchema>;
