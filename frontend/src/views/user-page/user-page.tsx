import { Suspense } from "react";
import { Overview } from "./overview";
import { Projects } from "./projects";


type Props = PageProps<"/[username]">;

/** Показывает основные сведения об учетной записи пользователя. */
export function UserPage(props: Props) {
  return (
    <main className="mt-2 flex min-h-0 flex-1">
      <div className="mx-auto w-full max-w-[1280px]">
        <Suspense fallback={null}>
          <UserPageContent {...props} />
        </Suspense>
      </div>
    </main>
  );
}

/** Выбирает виджет профиля по параметру вкладки. */
async function UserPageContent({ params, searchParams }: Props) {
  const { tab } = await searchParams;
  const { username } = await params;

  if (tab === "projects") {
    return <Projects username={username} />;
  }

  return <Overview username={username} />;
}
