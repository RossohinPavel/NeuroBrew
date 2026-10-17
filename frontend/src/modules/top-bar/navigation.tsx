import "server-only";

import { isUserAuthenticated } from "@/entities/session";
import { getMeOrThrow } from "@/entities/user";
import { AuthenticatedNavigation } from "./nav-auth";
import { UnauthenticatedNavigation } from "./nav-unauth";


/** Отображает навигацию в соответствии с состоянием сессии. */
export async function Navigation() {
  const isAuthenticated = await isUserAuthenticated();

  if (isAuthenticated) {
    const user = await getMeOrThrow();

    return <AuthenticatedNavigation username={user.username} />;
  }

  return <UnauthenticatedNavigation />;
}
