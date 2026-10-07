import "server-only";

import * as Session from "@/entities/session";
import { getSessionUser } from "@/entities/user";
import { AuthenticatedNavigation } from "./auth-nav";
import { UnauthenticatedNavigation } from "./unauth-nav";


/** Отображает навигацию в соответствии с состоянием сессии. */
export async function Router() {
  const session = await Session.get();
  if (session) {
    const user = await getSessionUser();
    return <AuthenticatedNavigation username={user.username} />;
  }
  return <UnauthenticatedNavigation />;
}
