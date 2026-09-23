import { redirect } from "next/navigation";
import { getSession } from "@/entities/session";


export default async function Layout({ children }: LayoutProps<"/login">) {
  const session = await getSession();
  if (session !== null) redirect("/");
  return children;
}
