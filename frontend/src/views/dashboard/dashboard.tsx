import { Suspense } from "react";
import { Changelog } from "./changelog";
import { Feed } from "./feed";
import { Repositories } from "./repositories";


/** Представляет дашборд пользователя. */
export function Dashboard() {
  return (
    <main className="grid flex-1 grid-cols-4 bg-surface-1">
      <section className="col-span-1">
        <Suspense fallback={null}>
          <Repositories />
        </Suspense>
      </section>
      <section className="col-span-2">
        <Suspense fallback={null}>
          <Feed />
        </Suspense>
      </section>
      <section className="col-span-1">
        <Suspense fallback={null}>
          <Changelog />
        </Suspense>
      </section>
    </main>
  );
}
