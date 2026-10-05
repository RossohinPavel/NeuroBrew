"use server";

import { createRegistryRepository } from "@shared/database";
import { DB } from "@/common/db-connection";
import { get } from "@/entities/session";


const { createProject } = createRegistryRepository(DB);


/** Создает проект для текущего пользователя. */
export const createProjectAction = async (formData: FormData) => {
  const session = await get();
  if (session === undefined) {
    throw new Error("Необходимо войти в аккаунт");
  }
  const name = formData.get("name") as string;
  await createProject({ name, userId: session.userId });
};
