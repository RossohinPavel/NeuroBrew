import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { integer, snakeCase, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { user } from "./user.js";


export const registrySchema = snakeCase.schema("registry");

export const project = registrySchema.table("project", {
  id: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  accountId: integer()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: varchar({ length: 128 })
    .notNull(),
  createdAt: timestamp({ withTimezone: true })
    .defaultNow()
    .notNull(),
}, (table) => [
  uniqueIndex("project_account_id_name_unique").on(table.accountId, table.name),
]);

export type ProjectInsert = InferInsertModel<typeof project>;
export type ProjectSelect = InferSelectModel<typeof project>;

export const agentsmd = registrySchema.table("agentsmd", {
  id: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  projectId: integer()
    .notNull()
    .unique()
    .references(() => project.id, { onDelete: "cascade" }),
  content: varchar({ length: 32768 }) // Примерно 4–5 тысяч слов.
    .notNull(),
});

export type AgentsmdInsert = InferInsertModel<typeof agentsmd>;
export type AgentsmdSelect = InferSelectModel<typeof agentsmd>;

export const rule = registrySchema.table("rule", {
  id: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  projectId: integer()
    .notNull()
    .references(() => project.id, { onDelete: "cascade" }),
  name: varchar({ length: 64 })
    .notNull(),
  content: varchar({ length: 4096 }) // Примерно 500–700 слов.
    .notNull(),
});

export type RuleInsert = InferInsertModel<typeof rule>;
export type RuleSelect = InferSelectModel<typeof rule>;

export const skill = registrySchema.table("skill", {
  id: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  projectId: integer()
    .notNull()
    .references(() => project.id, { onDelete: "cascade" }),
  name: varchar({ length: 64 })
    .notNull(),
  description: varchar({ length: 512 }) // Примерно 65–85 слов.
    .notNull(),
  content: varchar({ length: 4096 }) // Примерно 500–700 слов.
    .notNull(),
});

export type SkillInsert = InferInsertModel<typeof skill>;
export type SkillSelect = InferSelectModel<typeof skill>;
