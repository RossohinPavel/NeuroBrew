import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { integer, varchar } from "drizzle-orm/pg-core";
import { user } from "./user.js";
import { userSchema } from "./schema.js";


/*
 * Первичный ключ userId ограничивает аккаунт одним профилем.
 * Имя пользователя ограничено 64 символами, чтобы не раздувать индекс;
 * точное ограничение определяется бизнес-логикой.
 */
export const profile = userSchema.table("profile", {
  userId: integer()
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  username: varchar({ length: 64 })
    .notNull()
    .unique(),
});

export type ProfileInsert = InferInsertModel<typeof profile>;
export type ProfileSelect = InferSelectModel<typeof profile>;
