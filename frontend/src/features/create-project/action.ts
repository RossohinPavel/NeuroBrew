"use server";

import { type CreateProjectFormData } from "./schema";


/** Создает проект для текущего пользователя. */
export const createProjectAction = (async (formData: CreateProjectFormData) => {
  return null;
  // const user = await requireCurrentUser();
  // const { name } = await v.parseAsync(CreateProjectFormSchema, formData);
  // await createProject({ name, userId: user.id });
});
