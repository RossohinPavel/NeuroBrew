import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { integer, snakeCase, timestamp, varchar } from "drizzle-orm/pg-core";


/*
 * В общей практике схемы принято именовать в единственном числе.
 * Для схемы и таблицы пользователей используется имя `users`,
 * поскольку `user` — зарезервированное слово в PostgreSQL.
 */
export const userSchema = snakeCase.schema("users");

/*
 * Длина email ограничена стандартными 255 символами.
 *
 * Для хеша пароля оставлен запас под алгоритмы с нефиксированной длиной, включая Argon2.
 */
export const user = userSchema.table("users", {
  id: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 })
    .notNull()
    .unique(),
  passwordHash: varchar({ length: 255 })
    .notNull(),
  createdAt: timestamp({ withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type UserInsert = InferInsertModel<typeof user>;
export type UserSelect = InferSelectModel<typeof user>;

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
