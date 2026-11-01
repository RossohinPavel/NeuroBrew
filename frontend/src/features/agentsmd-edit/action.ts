"use server";

import { updateAgentsmd } from "@/common/api/generated/endpoints";
import type { ActionResponse } from "@/common/server-action";
import { getSessionOrThrow } from "@/entities/session";
import type { AgentsmdUpdateRequest } from "@shared/contracts";


/** Обновляет AGENTS.md проекта и возвращает сохранённое содержимое. */
export const editAgentsmdAction = async (
  formData: AgentsmdUpdateRequest,
): ActionResponse<{ content: string }> => {
  const session = await getSessionOrThrow();
  const result = await updateAgentsmd(formData, session);

  if (result.status === 200) {
    return {
      success: true,
      data: { content: result.data.content },
    };
  }

  if (result.status >= 300 && result.status <= 500) {
    return {
      success: false,
      error: { message: result.data.message ?? "Не удалось сохранить AGENTS.md." },
    };
  }

  throw new Error(`Failed to update AGENTS.md: ${result.status}`);
};
