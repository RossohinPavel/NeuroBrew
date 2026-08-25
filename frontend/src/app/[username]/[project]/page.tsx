type Props = PageProps<"/[username]/[project]">;

export default async function ProjectPage({ params }: Props) {
  const { username, project } = await params;

  return (
    <main>
      {username}/{project}
    </main>
  );
}
