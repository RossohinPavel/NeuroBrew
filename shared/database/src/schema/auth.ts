import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { integer, pgSchema, timestamp, varchar } from "drizzle-orm/pg-core";


export const authSchema = pgSchema("auth");

// Таблицы в PostgreSQL принято именовать в единственном числе, 
// за исключением зарезервированных слов. `users` — допустимый вариант.
export const users = authSchema.table("users", {
  id: (
    integer()
      .primaryKey()
      .generatedAlwaysAsIdentity()
  ),
  email: (
    varchar({ length: 255 }) // Стандартное ограничение для адресов
      .notNull()
      .unique()
  ),
  passwordHash: (
    varchar({ length: 255 }) // Нужно ставить в зависимости от либы.
      .notNull()             // Аргон2 генерирует хеш нефиксированной длинны, поэтому с запасом.
  ),
  username: (
    varchar({ length: 64 })  // Это поле ограничиваем, чтобы не раздувать индекс.
      .notNull()             // Конкретное значение уже зависит от бизнес-логики.
      .unique()
  ),
  createdAt: (
    timestamp({ withTimezone: true })
      .defaultNow()
      .notNull()
  ),
});

export type UserInsert = InferInsertModel<typeof users>;
export type UserSelect = InferSelectModel<typeof users>;
