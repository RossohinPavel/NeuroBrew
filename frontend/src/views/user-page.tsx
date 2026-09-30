import { createRegistryRepository } from "@shared/database";
import { DB } from "@/common/db-connection";
import { Payload } from "@/entities/session";
import { getUserOr404 } from "@/entities/user";
import { CreateProjectForm } from "@/features/create-project";


const { getUserProjects } = createRegistryRepository(DB);


type Props = PageProps<"/[username]">;

/** Показывает основные сведения об учетной записи пользователя. */
export async function UserPage({ params }: Props) {
  const { username } = await params;
  const [user, session] = await Promise.all([
    getUserOr404(username),
    Payload.readFromHeaders(),
  ]);
  const projects = await getUserProjects(user.id);
  const isGuest = session === null || session.userId !== user.id;
  return (
    <main className="flex flex-col gap-2">
      <p>Имя: {user.username}</p>
      <p>Электронная почта: {user.email}</p>
      <p>Дата создания: {user.createdAt.toISOString()}</p>
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
