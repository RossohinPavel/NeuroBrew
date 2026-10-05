import { Suspense } from "react";
import { Router } from "./router";


export function Home() {
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
}