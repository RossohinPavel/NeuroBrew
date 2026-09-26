import { sql, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
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
    varchar({ length: 255 })
      .notNull()
      .unique()
  ),
  passwordHash: (
    varchar({ length: 255 })
      .notNull()
  ),
  username: (
    varchar({ length: 255 })
      .notNull()
      .unique()
  ),
  createdAt: (
    timestamp({ withTimezone: true })
      .defaultNow()
      .notNull()
  ),
  updatedAt: (
    timestamp({ withTimezone: true })
      .defaultNow()
      .$onUpdate(() => sql`now()`)
      .notNull()
  ),
});

export type UserInsert = InferInsertModel<typeof users>;
export type UserSelect = InferSelectModel<typeof users>;
