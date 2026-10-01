import { users } from "./auth";
import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { integer, pgSchema, uniqueIndex, varchar } from "drizzle-orm/pg-core";


export const registrySchema = pgSchema("registry");

export const project = registrySchema.table("project", {
  id: (
    integer()
      .primaryKey()
      .generatedAlwaysAsIdentity()
  ),
  userId: (
    integer()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
  ),
  name: (
    varchar({ length: 128 })
      .notNull()
  ),
}, (table) => [
  uniqueIndex("project_user_id_name_unique").on(table.userId, table.name),
]);

export type ProjectInsert = InferInsertModel<typeof project>;
export type ProjectSelect = InferSelectModel<typeof project>;

// registrySchema.table("guidance");
// registrySchema.table("rule");
// registrySchema.table("skill");
