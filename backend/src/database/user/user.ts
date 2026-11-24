import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { userSchema } from "./schema.js";


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
