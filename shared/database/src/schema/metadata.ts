import { integer, pgSchema, timestamp, varchar } from "drizzle-orm/pg-core";


export const metadataSchema = pgSchema("metadata");

export const changelog = metadataSchema.table("changelog", {
  id: (
    integer()
      .primaryKey()
      .generatedAlwaysAsIdentity()
  ),
  createdAt: (
    timestamp({ withTimezone: true })
      .defaultNow()
      .notNull()
  ),
  title: (
    varchar({ length: 128 })
      .notNull()
  ),
});
