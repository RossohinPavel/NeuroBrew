import { notFound } from "next/navigation";
import { createAuthRepository } from "@shared/database";
import { DB } from "@/common/db-connection";


const { searchUser } = createAuthRepository(DB);


export default async function Layout({ children, params }: LayoutProps<"/[username]">) {
  const { username } = await params;
  const user = await searchUser({ username });
  if (user === undefined) {
    notFound();
  }
  return children;
}
