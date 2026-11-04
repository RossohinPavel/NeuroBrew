"use server";

import { createProject } from "@/common/api/generated/endpoints";
import type { ActionResponse } from "@/common/server-action";
import { getSessionOrThrow } from "@/entities/session";
import { getMeOrThrow } from "@/entities/user";
import type { CreateProjectRequest } from "@shared/contracts";


/** Создает проект и возвращает данные для перехода на его страницу. */
export const createProjectAction = async (
  formData: CreateProjectRequest,
): ActionResponse<{ name: string; username: string }> => {
  const session = await getSessionOrThrow();
  const result = await createProject(formData, session);

  if (result.status === 201) {
    const user = await getMeOrThrow();

    return {
      success: true,
      data: {
        name: result.data.name,
        username: user.username,
      },
    };
  }

  if (result.status === 400 || result.status === 409) {
    return {
      success: false,
      error: { message: result.data.message ?? "Не удалось создать проект." },
    };
  }

  throw new Error(`Failed to create project: ${result.status}`);
};
