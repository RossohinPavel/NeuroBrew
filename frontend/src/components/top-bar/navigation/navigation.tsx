import { cookies } from "next/headers";
import { getPayload } from "@/entities/session";
import { AuthenticatedNavigation } from "./auth";
import { UnauthenticatedNavigation } from "./unauth";


/** Выбирает навигацию по данным пользователя в cookie сессии. */
export async function Navigation() {
  const cookieStore = await cookies();
  const payload = getPayload(cookieStore);

  if (payload !== undefined) {
    return <AuthenticatedNavigation username={payload.username} />;
  }

  return <UnauthenticatedNavigation />;
}
