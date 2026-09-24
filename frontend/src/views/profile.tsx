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
  const profileOwner = user!;
  const isGuest = session === null || session.userId !== profileOwner.id;
  return (
    <main className="flex flex-col gap-2">
      <p>Имя: {profileOwner.username}</p>
      <p>Электронная почта: {profileOwner.email}</p>
      <p>Дата создания: {profileOwner.createdAt.toLocaleDateString("ru-RU")}</p>
      <p>Статус: {isGuest ? "Гость" : "Пользователь"}</p>
    </main>
  );
}
