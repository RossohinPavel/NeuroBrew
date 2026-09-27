import { users } from "./auth";
import { integer, pgSchema, varchar } from "drizzle-orm/pg-core";


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
});

// registrySchema.table("guidance");
// registrySchema.table("rule");
// registrySchema.table("skill");
