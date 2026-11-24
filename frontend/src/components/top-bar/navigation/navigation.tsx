import "server-only";

import { get } from "@/entities/session";
import { AuthenticatedNavigation } from "./auth";
import { UnauthenticatedNavigation } from "./unauth";


/** Выбирает навигацию по наличию сессии пользователя. */
export async function Navigation() {
  const { payload } = await get();

  if (payload !== undefined) {
    return <AuthenticatedNavigation username={payload.username} />;
  }

  return <UnauthenticatedNavigation />;
}
