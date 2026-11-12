import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getFile } from "@/shared/api/generated/endpoints";


type Props = PageProps<"/[username]/[project]/file/[filename]">;

/** Показывает страницу файла проекта. */
export default function FilePage(props: Props) {
  return (
    <main className="min-w-0 flex-1 p-4">
      <Suspense fallback={null}>
        <FileContent {...props} />
      </Suspense>
    </main>
  );
}

/** Загружает файл по параметрам маршрута и показывает его содержимое. */
async function FileContent({ params }: Props) {
  const { username, project, filename } = await params;
  const response = await getFile({
    username,
    projectName: project,
    name: decodeURIComponent(filename),
  });

  if (response.status === 200) {
    return (
      <div>
        <h1 className="text-xl font-semibold">{response.data.name}</h1>
        <pre className="whitespace-pre-wrap">{response.data.content}</pre>
      </div>
    );
  }

  if (response.status === 404) {
    notFound();
  }

  throw new Error("Failed to load project file.");
}
