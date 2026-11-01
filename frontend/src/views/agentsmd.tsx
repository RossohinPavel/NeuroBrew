import { Suspense } from "react";
import { getAgentsmdOr404 } from "@/entities/agentsmd";
import { getSession } from "@/entities/session";
import { getMeOrThrow } from "@/entities/user";
import { AgentsmdEditForm, AgentsmdEditSkeleton } from "@/features/agentsmd-edit";


type Props = PageProps<"/[username]/[project]/agentsmd">;

/** Показывает страницу AGENTS.md проекта. */
export function Agentsmd(props: Props) {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1280px] p-4">
        <Suspense fallback={<AgentsmdEditSkeleton />}>
          <AgentsmdContent {...props} />
        </Suspense>
      </div>
    </main>
  );
}

/** Загружает AGENTS.md проекта и передаёт содержимое форме. */
async function AgentsmdContent({ params }: Props) {
  const { username, project } = await params;
  const agentsmd = await getAgentsmdOr404(username, project);
  
  const session = await getSession();
  const isAuthor = session !== undefined && (await getMeOrThrow()).username === username;

  return <AgentsmdEditForm content={agentsmd.content} isAuthor={isAuthor} projectName={project} />;
}
