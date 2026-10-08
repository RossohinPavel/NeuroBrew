import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import type { ReactNode } from "react";


/** Предоставляет общую оболочку секции журнала изменений. */
export function ChangelogCard({ children }: { children?: ReactNode }) {
  return (
    <Card className="h-full">
      <CardHeader className="border-b">
        <CardTitle>Ченджлог</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
