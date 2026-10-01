import "server-only";

import { createRegistryRepository } from "@shared/database";
import { notFound } from "next/navigation";
import { cache } from "react";
import { DB } from "@/common/db-connection";


const { findProject } = createRegistryRepository(DB);


/** Возвращает найденный проект или отвечает страницей 404. */
export const getProjectOr404 = cache(async (name: string) => {
  const project = await findProject({ name });
  if (project === undefined) {
    notFound();
  }
  return project;
});
