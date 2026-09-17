type Props = PageProps<"/[username]/[project]">;

/** Представляет проект пользователя из параметров маршрута. */
export async function Project({ params }: Props) {
  const { username, project } = await params;

  return (
    <main>
      {username}/{project}
    </main>
  );
}
