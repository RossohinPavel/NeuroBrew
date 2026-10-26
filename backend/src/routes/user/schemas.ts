import * as v from "valibot";


export const UsersQuerySchema = v.object({
  email: v.optional(v.pipe(
    v.string(),
    v.email(),
  )),
  username: v.optional(v.pipe(
    v.string(),
    v.minLength(1),
  )),
});

export type UsersQuery = v.InferOutput<typeof UsersQuerySchema>;

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

export const UsersResponseSchema = v.array(UserResponseSchema);

export type UserResponse = v.InferOutput<typeof UserResponseSchema>;

export type UsersResponse = v.InferOutput<typeof UsersResponseSchema>;
