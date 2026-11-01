import "server-only";

import { Suspense } from "react";
import { getSession } from "@/entities/session";
import { Dashboard } from "./dashboard";
import { Landing } from "./landing";


async function Content() {
  const session = await getSession();
  return session !== undefined ? <Dashboard /> : <Landing />;
}

export function Home() {
  return (
    <main className="flex min-h-0 flex-1">
      <Suspense fallback={null}>
        <Content />
      </Suspense>
    </main>
  );
}
