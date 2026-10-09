"use server";

import { createRegistryRepository } from "@shared/database";
import * as v from "valibot";
import { DB } from "@/common/db-connection";
import { safeAction } from "@/common/safe-action";
import { requireCurrentUser } from "@/entities/user";
import { CreateProjectFormSchema, type CreateProjectFormData } from "./schema";


const { createProject } = createRegistryRepository(DB);


/** Создает проект для текущего пользователя. */
export const createProjectAction = safeAction(async (formData: CreateProjectFormData) => {
  const user = await requireCurrentUser();
  const { name } = await v.parseAsync(CreateProjectFormSchema, formData);
  await createProject({ name, userId: user.id });
});
