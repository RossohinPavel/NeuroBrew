import "server-only";

import { Suspense } from "react";
import { Dashboard } from "@/components/pages/dashboard";
import { Landing } from "@/components/pages/landing";
import { getSession } from "@/entities/session";


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
