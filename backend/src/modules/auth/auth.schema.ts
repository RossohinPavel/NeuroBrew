import * as v from "valibot";


export const RegisterResponseSchema = v.object({
  accessToken: v.string(),
  refreshToken: v.string(),
});

export type RegisterResponse = v.InferOutput<typeof RegisterResponseSchema>;
