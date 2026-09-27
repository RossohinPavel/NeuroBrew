"use server";

import { DB } from "@/common/db";
import { Payload } from "@/entities/session";


/** Создает проект для текущего пользователя. */
export const createProjectAction = async (formData: FormData) => {
  const session = await Payload.readFromHeaders();
  if (session === null) {
    throw new Error("Необходимо войти в аккаунт");
  }
  const name = formData.get("name") as string;
  await DB.registry.createProject({ name, userId: session.userId });
};
