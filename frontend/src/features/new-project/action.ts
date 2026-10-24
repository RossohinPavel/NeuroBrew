"use server";

import type { ActionResponse } from "@/common/server-action";
import type { CreateProjectRequest } from "@shared/contracts";


/** Сообщает о временной недоступности создания проекта до восстановления API. */
export const createProjectAction = async (
  _formData: CreateProjectRequest,
): ActionResponse<CreateProjectRequest & { username: string }> => {
  console.warn("createProjectAction: нужно заменить заглушку вызовом API-метода.");

  return {
    success: false,
    error: { message: "Создание проектов временно недоступно." },
  };
};
