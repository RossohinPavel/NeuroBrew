import { users, type UserInsert } from "../schema";
import { Repository } from "./repo";


export class AuthRepository extends Repository {

  async createUser(user: UserInsert) {
    const [createdUser] = await this.connection
      .insert(users)
      .values(user)
      .returning();
    return createdUser;
  }
}
