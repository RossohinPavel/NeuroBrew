"use server";

import { createRegistryRepository } from "@shared/database";
import { DB } from "@/common/db-connection";
import { Payload } from "@/entities/session";


const { createProject } = createRegistryRepository(DB);


/** Создает проект для текущего пользователя. */
export const createProjectAction = async (formData: FormData) => {
  const session = await Payload.get();
  if (session === null) {
    throw new Error("Необходимо войти в аккаунт");
  }
  const name = formData.get("name") as string;
  await createProject({ name, userId: session.userId });
};
