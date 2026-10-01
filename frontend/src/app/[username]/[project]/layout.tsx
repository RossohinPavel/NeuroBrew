import { getProjectByUsernameOr404 } from "@/entities/project";


export default async function Layout({ children, params }: LayoutProps<"/[username]/[project]">) {
  const { project, username } = await params;
  await getProjectByUsernameOr404(username, project);
  return children;
}
