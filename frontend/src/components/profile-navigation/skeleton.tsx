import { Tabs, TabsList, TabsTrigger } from "@/shared/shadcn/ui/tabs";


/** Сохраняет размеры навигации профиля во время загрузки её содержимого. */
export function ProfileNavigationSkeleton() {
  return (
    <Tabs value="overview">
      <TabsList variant="line" render={<nav inert />}>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
