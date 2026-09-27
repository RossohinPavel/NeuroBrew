import { notFound } from "next/navigation";
import { DB } from "@/common/db";
import { Payload } from "@/entities/session";


export default async function Layout({ children, params }: LayoutProps<"/[username]/brew">) {
  const { username } = await params;
  const [user, session] = await Promise.all([
    DB.auth.searchUser({ username }),
    Payload.readFromHeaders(),
  ]);
  if (user === undefined || session === null || session.userId !== user.id) {
    notFound();
  }
  return children;
}
