import "server-only";

import { get } from "@/entities/session";
import { AuthenticatedNavigation } from "./auth-nav";
import { UnauthenticatedNavigation } from "./unauth-nav";


/** Отображает навигацию в соответствии с состоянием сессии. */
export async function Router() {
  const session = await get();
  if (session) {
    return <AuthenticatedNavigation userId={session.userId} />;
  }
  return <UnauthenticatedNavigation />;
}
