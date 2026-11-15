import { Suspense } from "react";
import { ChangelogList } from "@/entities/changelog";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/shadcn/ui/card";


/** Представляет карточку журнала изменений пользователя. */
export function Changelog() {
  return (
    <Card className="h-full">
      <CardHeader className="border-b">
        <CardTitle>Ченджлог</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={null}>
          <ChangelogList className="list-disc space-y-2 pl-4" />
        </Suspense>
      </CardContent>
    </Card>
  );
}
