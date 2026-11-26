import { TopBarBreadcrumb } from "./breadcrumb";
import { AuthenticatedNavigation, UnauthenticatedNavigation } from "./navigation";


/** Отображает верхнюю панель приложения. */
export function TopBar({ username }: { username: string | undefined }) {
  return (
    <header className="min-h-[56px]">
      <div className="flex items-center justify-between px-[15px] py-[10px]">
        <TopBarBreadcrumb />
        {username !== undefined ? (
          <AuthenticatedNavigation username={username} />
        ) : (
          <UnauthenticatedNavigation />
        )}
      </div>
    </header>
  );
}
