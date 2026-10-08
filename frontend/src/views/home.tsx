import "server-only";

import { get } from "@/entities/session";
import { Suspense } from "react";
import { Dashboard } from "./dashboard";
import { Landing } from "./landing";

async function Content() {
  const session = await get();
  return session ? <Dashboard /> : <Landing />;
}

export function Home() {
  return (
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  );
}
