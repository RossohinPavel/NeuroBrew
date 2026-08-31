import { users, type UserInsert } from "../schema";
import { Repository } from "./repo";


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
}
