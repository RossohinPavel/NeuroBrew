import { Payload } from "@/entities/session";
import { AuthenticatedNavigation } from "./authenticated-navigation";
import { UnauthenticatedNavigation } from "./unauthenticated-navigation";


/** Отображает навигацию в соответствии с состоянием сессии. */
export async function Navigation() {
  const session = await Payload.get();
  return (
    <div className="flex justify-end">
      {session === null ? (
        <UnauthenticatedNavigation />
      ) : (
        <AuthenticatedNavigation userId={session.userId} />
      )}
    </div>
  );
}
