import type { DatabaseConnection } from "../connection";
import { withConstraint } from "../errors";
import { users, type UserInsert, type UserSelect } from "../schema";
import type { SingleProperty } from "../utility-types";
import { eq } from "drizzle-orm";


type UserLookup =
  | SingleProperty<UserSelect, "id">
  | SingleProperty<UserSelect, "email">
  | SingleProperty<UserSelect, "username">;

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

  /** Ищет идентификатор пользователя по идентификатору, электронной почте или имени. */
  const findUserId = async (lookup: UserLookup) => {
    const [field, value] = Object.entries(lookup)[0] as [
      keyof UserSelect,
      UserSelect[keyof UserSelect],
    ];
    const [user] = await connection
      .select({ id: users.id })
      .from(users)
      .where(eq(users[field], value))
      .limit(1);
    return user?.id;
  };

  /** Ищет пользователя по идентификатору, электронной почте или имени. */
  const findUser = async (lookup: UserLookup) => {
    const [field, value] = Object.entries(lookup)[0] as [
      keyof UserSelect,
      UserSelect[keyof UserSelect],
    ];
    const [user] = await connection
      .select()
      .from(users)
      .where(eq(users[field], value))
      .limit(1);
    return user;
  };

  return {
    createUser,
    findUserId,
    findUser,
  };
}
