import { Payload } from "@/entities/session";
import { AuthenticatedTopBar } from "./authenticated-top-bar";
import { UnauthenticatedTopBar } from "./unauthenticated-top-bar";


/** Отображает верхнюю панель приложения. */
export async function TopBar() {
  const session = await Payload.get();
  return (
    <header>
      <div className="flex justify-end">
        {session === null ? (
          <UnauthenticatedTopBar />
        ) : (
          <AuthenticatedTopBar userId={session.userId} />
        )}
      </div>
      <hr />
    </header>
  );
}
