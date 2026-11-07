import "server-only";

import { getSession } from "@/entities/session";
import { getMeOrThrow } from "@/entities/user";
import { AuthenticatedNavigation } from "./nav-auth";
import { UnauthenticatedNavigation } from "./nav-unauth";


/** Выбирает навигацию по наличию сессии пользователя. */
export async function Navigation() {
  const session = await getSession();

  if (session !== undefined) {
    const user = await getMeOrThrow();

    return <AuthenticatedNavigation username={user.username} />;
  }

  return <UnauthenticatedNavigation />;
}
