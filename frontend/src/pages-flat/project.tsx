type Props = PageProps<"/[username]/[project]">;

export async function Project({ params }: Props) {
  const { username, project } = await params;

  return (
    <main>
      {username}/{project}
    </main>
  );
}
