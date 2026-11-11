import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { integer, snakeCase, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { user } from "./user.js";


export const registrySchema = snakeCase.schema("registry");

export const project = registrySchema.table("project", {
  id: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
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

export const file = registrySchema.table("file", {
  id: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  projectId: integer()
    .notNull()
    .references(() => project.id, { onDelete: "cascade" }),
  createdAt: timestamp({ withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  name: varchar({ length: 128 })
    .notNull(),
  content: text()
    .notNull(),
}, (table) => [
  uniqueIndex("file_project_id_name_unique").on(table.projectId, table.name),
]);

export type FileInsert = InferInsertModel<typeof file>;
export type FileSelect = InferSelectModel<typeof file>;
