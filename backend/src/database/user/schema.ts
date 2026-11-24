import { snakeCase } from "drizzle-orm/pg-core";


// Имя `users` используется потому, что `user` зарезервировано в PostgreSQL.
export const userSchema = snakeCase.schema("users");
