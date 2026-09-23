import { redirect } from "next/navigation";
import { Payload } from "@/entities/session";


export default async function Layout({ children }: LayoutProps<"/login">) {
  const session = await Payload.readFromHeaders();
  if (session !== null) redirect("/");
  return children;
}
