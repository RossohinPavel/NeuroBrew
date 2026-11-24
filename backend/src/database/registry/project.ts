import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { integer, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { registrySchema } from "./schema.js";
import { user } from "../user/user.js";


export const project = registrySchema.table("project", {
  id: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: varchar({ length: 128 })
    .notNull(),
  description: varchar({ length: 255 }),
  createdAt: timestamp({ withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .notNull(),
}, (table) => [
  uniqueIndex("project_user_id_name_unique").on(table.userId, table.name),
]);

export type ProjectInsert = InferInsertModel<typeof project>;
export type ProjectSelect = InferSelectModel<typeof project>;
