import { createAuthRepository } from "@shared/database";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DB } from "@/common/db-connection";


const { findUser } = createAuthRepository(DB);


type Props = {
  userId: number;
};

/** Отображает навигацию для авторизованного пользователя. */
export async function AuthenticatedTopBar({ userId }: Props) {
  const user = await findUser({ id: userId });
  if (user === undefined) {
    notFound();
  }
  return (
    <nav className="flex w-full justify-between" aria-label="Основная навигация">
      <span>{user.username}</span>
      <Link href="/logout">Log Out</Link>
    </nav>
  );
}
