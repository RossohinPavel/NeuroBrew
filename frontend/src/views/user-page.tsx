import { createRegistryRepository } from "@shared/database";
import { Suspense } from "react";
import { DB } from "@/common/db-connection";
import * as Session from "@/entities/session";
import { requireUser } from "@/entities/user";


const { listProjects } = createRegistryRepository(DB);


type Props = PageProps<"/[username]">;

/** Показывает основные сведения об учетной записи пользователя. */
export function UserPage(props: Props) {
  return (
    <Suspense fallback={null}>
      <UserPageContent {...props} />
    </Suspense>
  );
}

async function UserPageContent({ params }: Props) {
  const { username } = await params;
  const [user, session] = await Promise.all([
    requireUser(username),
    Session.get(),
  ]);
  const projects = await listProjects({ userId: user.id });
  const isGuest = session === undefined || session.userId !== user.id;
  return (
    <div className="flex flex-1 flex-col gap-2">
      <p>Имя: {user.username}</p>
      <p>Электронная почта: {user.email}</p>
      <p>Дата создания: {user.createdAt.toISOString()}</p>
      <p>Статус: {isGuest ? "Гость" : "Пользователь"}</p>
      <p>Проекты:</p>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
}
