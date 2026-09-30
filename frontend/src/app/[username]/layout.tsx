import { getUserOr404 } from "@/entities/user";


export default async function Layout({ children, params }: LayoutProps<"/[username]">) {
  const { username } = await params;
  await getUserOr404(username);
  return children;
}
