import type { drizzle } from "drizzle-orm/postgres-js";


export type DatabaseConnection = ReturnType<typeof drizzle>;

/** Служит основой репозиториев с общим подключением к базе данных и не создается напрямую. */
export abstract class Repository {
  constructor(protected readonly connection: DatabaseConnection) {}
}
