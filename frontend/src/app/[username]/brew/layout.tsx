import { createAuthRepository } from "@shared/database";
import { notFound } from "next/navigation";
import { DB } from "@/common/db-connection";
import { Payload } from "@/entities/session";


const { findUser } = createAuthRepository(DB);


export default async function Layout({ children, params }: LayoutProps<"/[username]/brew">) {
  const { username } = await params;
  const [user, session] = await Promise.all([
    findUser({ username }),
    Payload.readFromHeaders(),
  ]);
  if (user === undefined || session === null || session.userId !== user.id) {
    notFound();
  }
  return children;
}
