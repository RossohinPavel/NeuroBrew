import { users, type UserInsert } from "../schema";
import { Repository } from "./repo";
import { eq } from "drizzle-orm";


/** Выполняет операции с данными схемы аутентификации. */
export class AuthRepository extends Repository {

  /** Создает пользователя и возвращает сохраненную запись. */
  async createUser(user: UserInsert) {
    const [createdUser] = await this.connection
      .insert(users)
      .values(user)
      .returning();
    return createdUser;
  }

  /** Возвращает пользователя с указанной электронной почтой. */
  async getUserByEmail(email: string) {
    const [user] = await this.connection
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    return user;
  }
}
