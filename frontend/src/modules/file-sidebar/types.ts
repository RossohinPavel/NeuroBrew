/** Асинхронные параметры проекта, необходимые сайдбару. */
export type FileSidebarParams = Promise<{
  username: string;
  project: string;
}>;
