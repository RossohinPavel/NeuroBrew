"use server";

import { createProject } from "@/common/api/generated/endpoints";
import type { CreateProject201 } from "@/common/api/generated/models";
import type { ActionResponse } from "@/common/server-action";
import * as Session from "@/entities/session";
import { getMeOrThrow } from "@/entities/user";
import type { CreateProjectRequest } from "@shared/contracts";


const createProjectWithSession = Session.withSession(createProject);


/** Создает проект для текущего пользователя. */
export const createProjectAction = async (
  formData: CreateProjectRequest,
): ActionResponse<CreateProject201 & { username: string }> => {
  const user = await getMeOrThrow();
  const result = await createProjectWithSession(formData);

  if (result.status !== 201) {
    const message = result.data.message ?? "Не удалось создать проект.";

    return { success: false, error: { message } };
  }

  return { success: true, data: { ...result.data, username: user.username } };
};
