import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";


interface Props {
  children?: ReactNode;
}

/** Предоставляет общую оболочку секции репозиториев. */
export function RepositoriesCard({ children }: Props) {
  return (
    <Card className="h-full">
      <CardHeader className="border-b">
        <CardTitle>Репозитории</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
