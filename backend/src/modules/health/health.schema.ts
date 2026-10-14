import * as v from "valibot";


export const healthResponseSchema = v.object({
  status: v.literal("ok"),
});
