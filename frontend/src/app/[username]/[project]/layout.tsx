import { notFound } from "next/navigation";
import { getProjectByUsernameOr404 } from "@/entities/project";
import { getUserOr404 } from "@/entities/user";


export default async function Layout({ children, params }: LayoutProps<"/[username]/[project]">) {
  const { project, username } = await params;
  const [user, foundProject] = await Promise.all([
    getUserOr404(username),
    getProjectByUsernameOr404(username, project),
  ]);
  if (user.id !== foundProject.userId) {
    notFound();
  }
  return children;
}
