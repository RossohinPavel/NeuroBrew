import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { integer, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { project } from "./project.js";
import { registrySchema } from "./schema.js";


export const fileType = registrySchema.enum("file_type", ["agentsmd", "skill", "rule"]);

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
  type: fileType()
    .notNull(),
  content: varchar({ length: 32768 })
    .notNull(),
}, (table) => [
  uniqueIndex("file_project_id_name_unique").on(table.projectId, table.name),
]);

export type FileInsert = InferInsertModel<typeof file>;
export type FileSelect = InferSelectModel<typeof file>;
