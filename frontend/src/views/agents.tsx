import { Suspense } from "react";
import { getAgentsmdOr404 } from "@/entities/agentsmd";


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

/** Загружает AGENTS.md проекта из пути и показывает его содержимое. */
async function AgentsContent({ params }: Props) {
  const { username, project } = await params;
  const agentsmd = await getAgentsmdOr404(username, project);

  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-xl font-semibold">AGENTS.md</h1>
      <pre className="whitespace-pre-wrap break-words font-sans text-sm">
        {agentsmd.content}
      </pre>
    </div>
  );
}
