import "server-only";

import { Suspense } from "react";
import { isUserAuthenticated } from "@/entities/session";
import { Dashboard } from "./dashboard";
import { Landing } from "./landing";


async function Content() {
  const isAuthenticated = await isUserAuthenticated();
  
  return isAuthenticated ? <Dashboard /> : <Landing />;
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
