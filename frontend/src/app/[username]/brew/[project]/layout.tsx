import { notFound } from "next/navigation";
import { getProjectOr404 } from "@/entities/project";
import { Payload } from "@/entities/session";
import { getUserOr404 } from "@/entities/user";


type Props = LayoutProps<"/[username]/brew/[project]">;

export default async function Layout({ children, params }: Props) {
  const { project, username } = await params;
  const [user, foundProject, session] = await Promise.all([
    getUserOr404(username),
    getProjectOr404(project),
    Payload.getOr404(),
  ]);
  if (session.userId !== user.id || foundProject.userId !== user.id) {
    notFound();
  }
  return children;
}
