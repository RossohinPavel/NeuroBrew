import { Suspense } from "react";
import { Changelog, ChangelogSkeleton } from "./changelog";
import { Feed } from "./feed";
import { MyProjects, MyProjectsSkeleton } from "./my-projects";


/** Представляет дашборд пользователя. */
export function Dashboard() {
  return (
    <div className="flex-1 bg-surface-1 p-4">
      <div className="grid h-full grid-cols-4 gap-4">
        <section className="col-span-1">
          <Suspense fallback={<MyProjectsSkeleton />}>
            <MyProjects />
          </Suspense>
        </section>
        <section className="col-span-2">
          <Suspense fallback={null}>
            <Feed />
          </Suspense>
        </section>
        <section className="col-span-1">
          <Suspense fallback={<ChangelogSkeleton />}>
            <Changelog />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
