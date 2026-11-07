import "server-only";

import { Suspense } from "react";
import { getSession } from "@/entities/session";
import { Dashboard } from "@/modules/pages/dashboard";
import { Landing } from "@/modules/pages/landing";

async function Content() {
  const session = await getSession();

  return session !== undefined ? <Dashboard /> : <Landing />;
}

export default function Home() {
  return (
    <main className="flex min-h-0 flex-1">
      <Suspense fallback={null}>
        <Content />
      </Suspense>
    </main>
  );
}
