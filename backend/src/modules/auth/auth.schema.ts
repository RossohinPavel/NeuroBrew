import * as v from "valibot";


export const authTokensResponseSchema = v.object({
  accessToken: v.string(),
  refreshToken: v.string(),
  tokenType: v.literal("Bearer"),
  expiresIn: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1),
  ),
});

export const meResponseSchema = v.object({
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

export type AuthTokensResponse = v.InferOutput<typeof authTokensResponseSchema>;
export type MeResponse = v.InferOutput<typeof meResponseSchema>;
