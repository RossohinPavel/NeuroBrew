import "server-only";

import { canUseBackendAsUser } from "@/entities/session";
import { getMeOrThrow } from "@/entities/user";
import { AuthenticatedNavigation } from "./nav-auth";
import { UnauthenticatedNavigation } from "./nav-unauth";


/** Выбирает навигацию по возможности работать с бэкендом от имени пользователя. */
export async function Navigation() {
  const canUseBackend = await canUseBackendAsUser();

  if (canUseBackend) {
    const user = await getMeOrThrow();

    return <AuthenticatedNavigation username={user.username} />;
  }

  return <UnauthenticatedNavigation />;
}
