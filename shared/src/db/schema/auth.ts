import { sql, type InferInsertModel } from "drizzle-orm";
import { integer, pgSchema, timestamp, varchar } from "drizzle-orm/pg-core";


export const authSchema = pgSchema("auth");

export const users = authSchema.table("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).defaultNow().$onUpdate(() => sql`now()`).notNull(),
});

export type UserInsert = InferInsertModel<typeof users>;
