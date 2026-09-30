import type { DatabaseConnection } from "../connection";
import { withConstraint } from "../errors";
import { users, type UserInsert, type UserSelect } from "../schema";
import { eq, or } from "drizzle-orm";


/** Создает репозиторий для управления учетными записями пользователей. */
export function createAuthRepository(connection: DatabaseConnection) {

  /** Создает пользователя и возвращает сохраненную запись. */
  const createUser = withConstraint(async (user: UserInsert) => {
    const [createdUser] = await connection
      .insert(users)
      .values(user)
      .returning();
    return createdUser;
  });

  /** Ищет пользователя по электронной почте или имени, объединяя критерии через «или». */
  const searchUser = async (lookup: Partial<Pick<UserSelect, "email" | "username">>) => {
    const conditions = [];
    for (const key in lookup) {
      const field = key as keyof typeof lookup;
      const value = lookup[field];
      if (value !== undefined) {
        conditions.push(eq(users[field], value));
      }
    }
    if (conditions.length === 0) {
      return undefined;
    }
    const [user] = await connection
      .select()
      .from(users)
      .where(or(...conditions))
      .limit(1);
    return user;
  };

  return {
    createUser,
    searchUser,
  };
}
