"use server";

import { createProject } from "@/common/api/generated/endpoints";
import type { ActionResponse } from "@/common/server-action";
import { WITH_SESSION } from "@/entities/session";
import { getMeOrThrow } from "@/entities/user";
import type { CreateProjectRequest } from "@shared/contracts";


/** Создает проект и возвращает данные для перехода на его страницу. */
export const createProjectAction = async (
  formData: CreateProjectRequest,
): ActionResponse<{ name: string; username: string }> => {
  const result = await createProject(formData, WITH_SESSION);

  if (result.status === 400 || result.status === 409) {
    return {
      success: false,
      error: { message: result.data.message ?? "Не удалось создать проект." },
    };
  }

  if (result.status !== 201) {
    throw new Error(`Failed to create project: ${result.status}`);
  }

  const user = await getMeOrThrow();

  return {
    success: true,
    data: {
      name: result.data.name,
      username: user.username,
    },
  };
};
