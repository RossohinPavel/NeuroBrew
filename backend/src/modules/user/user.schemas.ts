import * as v from "valibot";


export const UserParamsSchema = v.object({
  id: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1),
    v.maxValue(2147483647), // Максимальное значение PostgreSQL integer для users.id.
  ),
});

export type UserParams = v.InferOutput<typeof UserParamsSchema>;

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

export type UserResponse = v.InferOutput<typeof UserResponseSchema>;

export const UsersResponseSchema = v.array(UserResponseSchema);

export type UsersResponse = v.InferOutput<typeof UsersResponseSchema>;
