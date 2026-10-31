import { Suspense } from "react";
import { getAgentsmdOr404 } from "@/entities/agentsmd";
import { canUseBackendAsUser } from "@/entities/session";
import { getMeOrThrow } from "@/entities/user";
import { AgentsmdEditForm } from "@/features/agentsmd-edit";


type Props = PageProps<"/[username]/[project]/agentsmd">;

/** Показывает страницу AGENTS.md проекта. */
export function Agentsmd(props: Props) {
  return (
    <main className="flex min-h-0 flex-1">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="flex flex-col gap-2 p-4">
          <h1 className="text-xl font-semibold">AGENTS.md</h1>
          <Suspense fallback={null}>
            <AgentsmdContent {...props} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

/** Загружает AGENTS.md проекта и передаёт содержимое форме. */
async function AgentsmdContent({ params }: Props) {
  const { username, project } = await params;
  const agentsmd = await getAgentsmdOr404(username, project);
  const canUseBackend = await canUseBackendAsUser();
  const isAuthor = canUseBackend && (await getMeOrThrow()).username === username;

  return <AgentsmdEditForm content={agentsmd.content} isAuthor={isAuthor} />;
}
