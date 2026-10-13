import * as v from "valibot";


const envSchema = v.object({
  NODE_ENV: v.picklist(["development", "production", "test"]),
});

export const ENV = v.parse(envSchema, process.env);
