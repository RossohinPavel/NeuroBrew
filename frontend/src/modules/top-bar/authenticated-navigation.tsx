import { createAuthRepository } from "@shared/database";
import { notFound } from "next/navigation";
import { DB } from "@/common/db-connection";
import { LinkButton } from "./link-button";


const { findUser } = createAuthRepository(DB);


type Props = {
  userId: number;
};

/** Отображает навигацию для авторизованного пользователя. */
export async function AuthenticatedNavigation({ userId }: Props) {
  const user = await findUser({ id: userId });
  if (user === undefined) {
    notFound();
  }
  return (
    <nav className="flex w-full justify-between" aria-label="Основная навигация">
      <span>{user.username}</span>
      <LinkButton href="/logout" title="Log Out" />
    </nav>
  );
}
