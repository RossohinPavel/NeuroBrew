import "server-only";

import { get } from "@/entities/session";
import { Dashboard } from "../dashboard";
import { Landing } from "../landing";


export async function Router() {
  const session = await get();
  if (!session) {
    return <Landing />;
  }
  return <Dashboard />;
}