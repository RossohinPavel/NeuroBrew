import { notFound } from "next/navigation";
import { DB } from "@/common/db";


export default async function Layout({ children, params }: LayoutProps<"/[username]/brew/[project]">) {
  const { project } = await params;
  const foundProject = await DB.registry.searchProject(project);
  if (foundProject === undefined) {
    notFound();
  }
  return children;
}
