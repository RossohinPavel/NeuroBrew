import "server-only";

import { getCurrentUserOrThrow } from "@/entities/current-user";
import { getSession } from "@/entities/session";
import { AuthenticatedNavigation } from "./nav-auth";
import { UnauthenticatedNavigation } from "./nav-unauth";


/** Выбирает навигацию по наличию сессии пользователя. */
export async function Navigation() {
  const session = await getSession();

  if (session !== undefined) {
    const user = await getCurrentUserOrThrow();

    return <AuthenticatedNavigation username={user.username} />;
  }

  return <UnauthenticatedNavigation />;
}
