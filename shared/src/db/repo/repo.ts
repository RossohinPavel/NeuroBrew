import type { drizzle } from "drizzle-orm/postgres-js";


export type DatabaseConnection = ReturnType<typeof drizzle>;

export class Repository {
  constructor(protected readonly connection: DatabaseConnection) {}
}
