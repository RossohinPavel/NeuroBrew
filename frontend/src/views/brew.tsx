type Props = PageProps<"/[username]/brew/[project]">;

/** Представляет среду редактирования проекта пользователя. */
export async function Brew({ params }: Props) {
  const { username, project } = await params;
  return (
    <main>
      {username}/brew/{project}
    </main>
  );
}
