import { Tabs, TabsList, TabsTrigger } from "@/shared/shadcn/ui/tabs";


/** Сохраняет размеры навигации проекта во время загрузки её содержимого. */
export function ProjectNavigationSkeleton() {
  return (
    <Tabs value="">
      <TabsList variant="line" render={<nav inert />}>
        <TabsTrigger value="">Files</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
