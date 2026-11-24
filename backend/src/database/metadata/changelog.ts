import { integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { metadataSchema } from "./schema.js";


export const changelog = metadataSchema.table("changelog", {
  id: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  createdAt: timestamp({ withTimezone: true })
    .defaultNow()
    .notNull(),
  title: varchar({ length: 128 })
    .notNull(),
});
