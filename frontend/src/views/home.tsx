import "server-only";

import { Suspense } from "react";
import { canUseBackendAsUser } from "@/entities/session";
import { Dashboard } from "./dashboard";
import { Landing } from "./landing";


async function Content() {
  const canUseBackend = await canUseBackendAsUser();
  
  return canUseBackend ? <Dashboard /> : <Landing />;
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
