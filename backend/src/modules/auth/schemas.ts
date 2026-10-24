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

export type AuthTokensResponse = v.InferOutput<typeof authTokensResponseSchema>;
