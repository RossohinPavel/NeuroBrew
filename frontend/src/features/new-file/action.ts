"use server";

import { createFile } from "@/common/api/generated/endpoints";
import type { ActionResponse } from "@/common/server-action";
import { getSessionOrThrow } from "@/entities/session";
import type { CreateFileRequest, FileResponse } from "@shared/contracts";


/** Создает файл в проекте текущего пользователя и возвращает его данные. */
export const newFileAction = async (
  formData: CreateFileRequest,
): ActionResponse<FileResponse> => {
  const session = await getSessionOrThrow();
  const result = await createFile(formData, session);

  if (result.status === 201) {
    return {
      success: true,
      data: result.data,
    };
  }

  if (result.status === 400 || result.status === 404 || result.status === 409) {
    return {
      success: false,
      error: { message: result.data.message ?? "Не удалось создать файл." },
    };
  }

  throw new Error(`Failed to create file: ${result.status}`);
};
