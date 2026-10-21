import { Tabs, TabsList, TabsTrigger } from "@/common/shadcn/ui/tabs";


/** Сохраняет размеры навигации проекта во время загрузки её содержимого. */
export function Skeleton() {
  return (
    <Tabs value="">
      <TabsList variant="line" render={<nav inert />}>
        <TabsTrigger value="">About</TabsTrigger>
        <TabsTrigger value="guidance">Guidance</TabsTrigger>
        <TabsTrigger value="rules">Rules</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
