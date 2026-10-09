import {
  Card,
  CardHeader,
  CardTitle,
} from "@/common/shadcn/ui/card";


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
