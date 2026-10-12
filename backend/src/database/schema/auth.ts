import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { integer, snakeCase, timestamp, varchar } from "drizzle-orm/pg-core";


export const authSchema = snakeCase.schema("auth");

/*
 * Таблицы в PostgreSQL принято именовать в единственном числе, кроме зарезервированных слов,
 * поэтому для таблицы пользователей допустимо имя `users`.
 *
 * Длина email ограничена стандартными 255 символами.
 *
 * Для хеша пароля оставлен запас под алгоритмы с нефиксированной длиной, включая Argon2.
 *
 * Имя пользователя ограничено 64 символами, чтобы не раздувать индекс;
 * точное ограничение определяется бизнес-логикой.
 */
export const users = authSchema.table("users", {
  id: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 })
    .notNull()
    .unique(),
  passwordHash: varchar({ length: 255 })
    .notNull(),
  username: varchar({ length: 64 })
    .notNull()
    .unique(),
  createdAt: timestamp({ withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type UserInsert = InferInsertModel<typeof users>;
export type UserSelect = InferSelectModel<typeof users>;
