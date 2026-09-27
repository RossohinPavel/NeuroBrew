import { DB } from "@/common/db";
import { notFound } from "next/navigation";


export default async function Layout({ children, params }: LayoutProps<"/[username]/[project]">) {
  const { project } = await params;
  const foundProject = await DB.registry.searchProject(project);
  if (foundProject === undefined) {
    notFound();
  }
  return children;
}
