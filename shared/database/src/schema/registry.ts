import { users } from "./auth";
import { sql } from "drizzle-orm";
import { integer, pgSchema, timestamp, varchar } from "drizzle-orm/pg-core";


export const registrySchema = pgSchema("registry");

export const project = registrySchema.table("project", {
  id: (
    integer()
      .primaryKey()
      .generatedAlwaysAsIdentity()
  ),
  userId: (
    integer()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
  ),
  name: (
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

// registrySchema.table("guidance");
// registrySchema.table("rule");
// registrySchema.table("skill");
