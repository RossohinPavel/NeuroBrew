import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getFile } from "@/common/api/generated/endpoints";


type Props = PageProps<"/[username]/[project]/file/[...path]">;

/** Показывает содержимое запрошенного файла проекта. */
export function FilePage(props: Props) {
  return (
    <main className="min-w-0 flex-1 p-4">
      <Suspense fallback={null}>
        <FilePageContent {...props} />
      </Suspense>
    </main>
  );
}

/** Загружает файл по параметрам маршрута и показывает его содержимое. */
async function FilePageContent({ params }: Props) {
  const { username, project, path } = await params;
  const result = await getFile({
    username,
    projectName: project,
    path: decodeURIComponent(path.join("/")),
  });

  if (result.status === 200) {
    return (
      <pre className="whitespace-pre-wrap break-words">{result.data.content}</pre>
    );
  }

  if (result.status === 404) {
    return notFound();
  }

  throw new Error(`Failed to load the project's file: ${result.status}`);
}
