import * as v from "valibot";
import * as fields from "./fields.js";


export const GetUserRequestSchema = v.object({
  username: fields.UsernameInputSchema,
});

export const UserResponseSchema = v.object({
  id: v.number(),
  email: v.string(),
  username: v.string(),
  createdAt: v.string(),
});

export type GetUserRequest = v.InferInput<typeof GetUserRequestSchema>;
export type UserResponse = v.InferOutput<typeof UserResponseSchema>;
