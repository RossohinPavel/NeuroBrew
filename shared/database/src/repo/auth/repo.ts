import { users, type UserInsert, type UserSelect } from "../../schema";
import { Repository } from "../repo";
import { eq, or } from "drizzle-orm";


/** Управляет учетными записями пользователей в схеме аутентификации. */
export class AuthRepository extends Repository {

  /** Создает пользователя и возвращает сохраненную запись. */
  async createUser(user: UserInsert) {
    const [createdUser] = await this.connection
      .insert(users)
      .values(user)
      .returning();
    return createdUser;
  }

  /** Ищет пользователя по электронной почте или имени, объединяя критерии через «или». */
  async searchUser(lookup: Partial<Pick<UserSelect, "email" | "username">>) {
    const conditions = Object.keys(lookup)
      .map((key) => {
        const field = key as keyof typeof lookup;
        const value = lookup[field];
        if (value === undefined) {
          return value;
        }
        return eq(users[field], value);
      })
      .filter((condition) => condition !== undefined);
    if (conditions.length === 0) {
      return undefined;
    }
    const [user] = await this.connection
      .select()
      .from(users)
      .where(or(...conditions))
      .limit(1);
    return user;
  }
}
