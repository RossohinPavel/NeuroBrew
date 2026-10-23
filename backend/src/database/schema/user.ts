import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { integer, snakeCase, timestamp, varchar } from "drizzle-orm/pg-core";


/*
 * В общей практике схемы принято именовать в единственном числе.
 * Для схемы пользователей используется имя `users`,
 * поскольку `user` — зарезервированное слово в PostgreSQL.
 */
export const userSchema = snakeCase.schema("users");

/*
 * Длина email ограничена стандартными 255 символами.
 *
 * Для хеша пароля оставлен запас под алгоритмы с нефиксированной длиной, включая Argon2.
 */
export const account = userSchema.table("account", {
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

export type AccountInsert = InferInsertModel<typeof account>;
export type AccountSelect = InferSelectModel<typeof account>;

/*
 * Первичный ключ accountId ограничивает аккаунт одним профилем.
 * Имя пользователя ограничено 64 символами, чтобы не раздувать индекс;
 * точное ограничение определяется бизнес-логикой.
 */
export const profile = userSchema.table("profile", {
  accountId: integer()
    .primaryKey()
    .references(() => account.id, { onDelete: "cascade" }),
  username: varchar({ length: 64 })
    .notNull()
    .unique(),
});

export type ProfileInsert = InferInsertModel<typeof profile>;
export type ProfileSelect = InferSelectModel<typeof profile>;
