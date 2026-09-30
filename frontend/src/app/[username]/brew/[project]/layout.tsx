import { notFound } from "next/navigation";
import { createRegistryRepository } from "@shared/database";
import { DB } from "@/common/db-connection";


const { searchProject } = createRegistryRepository(DB);


export default async function Layout({ children, params }: LayoutProps<"/[username]/brew/[project]">) {
  const { project } = await params;
  const foundProject = await searchProject(project);
  if (foundProject === undefined) {
    notFound();
  }
  return children;
}
