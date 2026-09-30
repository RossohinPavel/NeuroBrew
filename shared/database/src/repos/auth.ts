import type { DatabaseConnection } from "../connection";
import { withConstraint } from "../errors";
import { users, type UserInsert, type UserSelect } from "../schema";
import { eq } from "drizzle-orm";


type UserLookupField = "id" | "email" | "username";
type SingleProperty<Type, Field extends keyof Type> = Pick<Type, Field> &
  Partial<Record<Exclude<keyof Type, Field>, never>>;
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

  /** Возвращает пользователя по идентификатору, электронной почте или имени. */
  const getUser = async (lookup: UserLookup) => {
    const [field, value] = Object.entries(lookup)[0] as [
      UserLookupField,
      UserSelect[UserLookupField],
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
    getUser,
  };
}
