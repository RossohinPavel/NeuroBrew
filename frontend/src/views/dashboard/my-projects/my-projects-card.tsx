import { Card, CardContent, CardHeader, CardTitle } from "@/common/shadcn/ui/card";
import type { ReactNode } from "react";


/** Предоставляет общую оболочку секции проектов пользователя. */
export function MyProjectsCard({ children }: { children?: ReactNode }) {
  return (
    <Card className="h-full">
      <CardHeader className="border-b">
        <CardTitle>Мои проекты</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
