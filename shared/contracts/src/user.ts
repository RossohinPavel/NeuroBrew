import * as v from "valibot";
import * as fields from "./fields.js";


export const UserGetRequestSchema = v.object({
  username: fields.UsernameInputSchema,
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
