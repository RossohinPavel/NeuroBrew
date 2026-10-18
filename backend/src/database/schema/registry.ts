import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { integer, snakeCase, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { users } from "./auth.js";


export const registrySchema = snakeCase.schema("registry");

export const project = registrySchema.table("project", {
  id: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar({ length: 128 })
    .notNull(),
  createdAt: timestamp({ withTimezone: true })
    .defaultNow()
    .notNull(),
}, (table) => [
  uniqueIndex("project_user_id_name_unique").on(table.userId, table.name),
]);

export type ProjectInsert = InferInsertModel<typeof project>;
export type ProjectSelect = InferSelectModel<typeof project>;

// registrySchema.table("guidance");
// registrySchema.table("rule");
// registrySchema.table("skill");
