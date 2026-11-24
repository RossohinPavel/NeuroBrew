import "server-only";

import { Suspense } from "react";
import { Dashboard } from "@/components/dashboard";
import { Landing } from "@/components/landing";
import { get } from "@/entities/session";


async function Content() {
  const { payload } = await get();

  return payload !== undefined ? <Dashboard /> : <Landing />;
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
