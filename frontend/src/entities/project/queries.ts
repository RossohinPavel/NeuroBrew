import "server-only";

import { createRegistryRepository } from "@shared/database";
import { notFound } from "next/navigation";
import { cache } from "react";
import { DB } from "@/common/db-connection";


const { findProjectByUsername } = createRegistryRepository(DB);


/** Возвращает найденный проект или отвечает страницей 404. */
export const getProjectByUsernameOr404 = cache(async (username: string, name: string) => {
  const project = await findProjectByUsername({ username, name });
  if (project === undefined) {
    notFound();
  }
  return project;
});
