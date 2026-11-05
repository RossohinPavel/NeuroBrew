import { Suspense } from "react";


type Props = PageProps<"/[username]/[project]/file/[...path]">;

/** Показывает параметры запрошенного файла проекта. */
export function FilePage(props: Props) {
  return (
    <main className="min-w-0 flex-1 p-4">
      <Suspense fallback={null}>
        <FilePageContent {...props} />
      </Suspense>
    </main>
  );
}

/** Дожидается параметров маршрута и выводит их на странице. */
async function FilePageContent({ params }: Props) {
  const { username, project, path } = await params;

  return (
    <div>
      <p>Пользователь: {username}</p>
      <p>Проект: {project}</p>
      <p>Путь: {path.join("/")}</p>
    </div>
  );
}
