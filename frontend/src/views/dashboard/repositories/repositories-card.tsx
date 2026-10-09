import { Card, CardContent, CardHeader, CardTitle } from "@/common/shadcn/ui/card";
import type { ReactNode } from "react";


/** Предоставляет общую оболочку секции репозиториев. */
export function RepositoriesCard({ children }: { children?: ReactNode }) {
  return (
    <Card className="h-full">
      <CardHeader className="border-b">
        <CardTitle>Репозитории</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
