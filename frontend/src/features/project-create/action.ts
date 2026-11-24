"use server";

import { getCurrentUserOrThrow } from "@/entities/current-user";
import { getOrThrow } from "@/entities/session";
import { createProject } from "@/shared/api/generated/endpoints";
import type { ActionResponse } from "@/shared/types/server-action";
import type { CreateProjectRequest } from "@shared/contracts";


/** Создает проект и возвращает данные для перехода на его страницу. */
export const projectCreateAction = async (
  formData: CreateProjectRequest,
): ActionResponse<{ name: string; username: string }> => {
  const { apiOptions } = await getOrThrow();
  const result = await createProject(formData, apiOptions);

  if (result.status === 201) {
    const user = await getCurrentUserOrThrow();

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
