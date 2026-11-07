import {
  Card,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/ui/card";


/** Представляет ленту событий пользователя. */
export function Feed() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Фид</CardTitle>
      </CardHeader>
    </Card>
  );
}
