import { notFound } from "next/navigation";
import { DB } from "@/common/db";
import { Payload } from "@/entities/session";


type Props = PageProps<"/[username]">;

/** Показывает основные сведения об учетной записи пользователя. */
export async function Profile({ params }: Props) {
  const { username } = await params;
  const [user, session] = await Promise.all([
    DB.auth.searchUser({ username }),
    Payload.readFromHeaders(),
  ]);
  if (user === undefined) notFound();
  const isGuest = session === null || session.userId !== user.id;
  return (
    <main className="flex flex-col gap-2">
      <p>Имя: {user.username}</p>
      <p>Электронная почта: {user.email}</p>
      <p>Дата создания: {user.createdAt.toISOString()}</p>
      <p>Статус: {isGuest ? "Гость" : "Пользователь"}</p>
    </main>
  );
}
