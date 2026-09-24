import { notFound } from "next/navigation";
import { DB } from "@/common/db";


export default async function Layout({ children, params }: LayoutProps<"/[username]">) {
  const { username } = await params;
  const user = await DB.auth.searchUser({ username });
  if (user === undefined) notFound();
  return children;
}
