import { loadEnvFile } from "node:process";
import { defineConfig } from "drizzle-kit";


loadEnvFile(".env");

export default defineConfig({
  out: "./drizzle/",
  schema: "./src/database/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
