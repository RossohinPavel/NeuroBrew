import { createRegistryRepository } from "@shared/database";
import { DB } from "@/common/db-connection";
import { get } from "@/entities/session";
import { getUserOr404 } from "@/entities/user";
import { CreateProjectForm } from "@/features/create-project";


const { listProjects } = createRegistryRepository(DB);


type Props = PageProps<"/[username]">;

/** Показывает основные сведения об учетной записи пользователя. */
export async function UserPage({ params }: Props) {
  const { username } = await params;
  const [user, session] = await Promise.all([
    getUserOr404(username),
    get(),
  ]);
  const projects = await listProjects({ userId: user.id });
  const isGuest = session === undefined || session.userId !== user.id;
  return (
    <div className="flex flex-1 flex-col gap-2">
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
    </div>
  );
}
