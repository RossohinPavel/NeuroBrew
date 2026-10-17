import "server-only";

import { me } from "@/common/api/generated/endpoints";
import { isUserAuthenticated, withSession } from "@/entities/session";
import { AuthenticatedNavigation } from "./nav-auth";
import { UnauthenticatedNavigation } from "./nav-unauth";


const getMe = withSession(me);


/** Отображает навигацию в соответствии с состоянием сессии. */
export async function Navigation() {
  const isAuthenticated = await isUserAuthenticated();

  if (isAuthenticated) {
    const response = await getMe();

    if (response.status !== 200) {
      throw new Error("Failed to load the authenticated user.");
    }

    return <AuthenticatedNavigation username={response.data.username} />;
  }

  return <UnauthenticatedNavigation />;
}
