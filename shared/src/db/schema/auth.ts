import { integer, pgSchema, varchar } from "drizzle-orm/pg-core";

export const authSchema = pgSchema("auth");

export const users = authSchema.table("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
});
