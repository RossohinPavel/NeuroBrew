import * as v from "valibot";


export const UserGetRequestSchema = v.object({
  username: v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(64),
  ),
});

export type UserGetRequest = v.InferInput<typeof UserGetRequestSchema>;

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
