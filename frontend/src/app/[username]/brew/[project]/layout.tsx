import { notFound } from "next/navigation";
import { getProjectByUsernameOr404 } from "@/entities/project";
import { Payload } from "@/entities/session";


type Props = LayoutProps<"/[username]/brew/[project]">;

export default async function Layout({ children, params }: Props) {
  const { project, username } = await params;
  const [foundProject, session] = await Promise.all([
    getProjectByUsernameOr404(username, project),
    Payload.getOr404(),
  ]);
  if (session.userId !== foundProject.userId) {
    notFound();
  }
  return children;
}
