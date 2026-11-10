import { Suspense } from "react";
import { OverviewTab } from "@/components/overview-tab";
import { ProjectsTab } from "@/components/projects-tab";


type Props = PageProps<"/[username]">;

/** Показывает основные сведения об учетной записи пользователя. */
export default function UserPage(props: Props) {
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
  const [{ tab }, { username }] = await Promise.all([searchParams, params]);

  if (tab === "projects") {
    return <ProjectsTab username={username} />;
  }

  return <OverviewTab username={username} />;
}
