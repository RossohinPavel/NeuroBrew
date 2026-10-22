import { Suspense } from "react";
import { getAgentsmdOr404 } from "@/entities/agentsmd";
import { getProjectByNameOr404 } from "@/entities/project";


type Props = PageProps<"/[username]/[project]/agents">;

/** Показывает страницу AGENTS.md проекта. */
export function Agents(props: Props) {
  return (
    <main className="flex min-h-0 flex-1">
      <div className="mx-auto w-full max-w-[1280px]">
        <Suspense fallback={null}>
          <AgentsContent {...props} />
        </Suspense>
      </div>
    </main>
  );
}

/** Загружает проект по имени из пути и показывает содержимое его AGENTS.md. */
async function AgentsContent({ params }: Props) {
  const { project } = await params;
  const foundProject = await getProjectByNameOr404(project);
  const agentsmd = await getAgentsmdOr404(foundProject.id);

  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-xl font-semibold">AGENTS.md</h1>
      <pre className="whitespace-pre-wrap break-words font-sans text-sm">
        {agentsmd.content}
      </pre>
    </div>
  );
}
