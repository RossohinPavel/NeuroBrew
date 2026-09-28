import { DB } from "@/common/db";
import { Payload } from "@/entities/session";
import { CreateProjectForm } from "@/features/create-project";


type Props = PageProps<"/[username]">;

/** Показывает основные сведения об учетной записи пользователя. */
export async function Profile({ params }: Props) {
  const { username } = await params;
  const [user, session] = await Promise.all([
    DB.auth.searchUser({ username }),
    Payload.readFromHeaders(),
  ]);
  const projects = await DB.registry.getUserProjects(user!.id);
  const isGuest = session === null || session.userId !== user!.id;
  return (
    <main className="flex flex-col gap-2">
      <p>Имя: {user!.username}</p>
      <p>Электронная почта: {user!.email}</p>
      <p>Дата создания: {user!.createdAt.toISOString()}</p>
      <p>Статус: {isGuest ? "Гость" : "Пользователь"}</p>
      {!isGuest && <CreateProjectForm />}
      <p>Проекты:</p>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </main>
  );
}
