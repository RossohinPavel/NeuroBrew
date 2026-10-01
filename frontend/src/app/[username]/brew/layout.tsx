import { notFound } from "next/navigation";
import { Payload } from "@/entities/session";
import { getUserOr404 } from "@/entities/user";


export default async function Layout({ children, params }: LayoutProps<"/[username]/brew">) {
  const { username } = await params;
  const [user, session] = await Promise.all([
    getUserOr404(username),
    Payload.readFromHeaders(),
  ]);
  if (session === null || session.userId !== user.id) {
    notFound();
  }
  return children;
}
