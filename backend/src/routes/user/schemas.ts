import * as v from "valibot";


export const UsersQuerySchema = v.object({
  username: v.optional(v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(64),
  )),
  lookup: v.optional(v.boolean()),
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

export type UserResponse = v.InferOutput<typeof UserResponseSchema>;

export const UsersResponseSchema = v.array(UserResponseSchema);

export type UsersResponse = v.InferOutput<typeof UsersResponseSchema>;
