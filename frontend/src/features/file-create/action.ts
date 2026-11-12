"use server";

import { refresh } from "next/cache";
import { getSessionOrThrow } from "@/entities/session";
import { createFile } from "@/shared/api/generated/endpoints";
import type { ActionResponse } from "@/shared/types/server-action";
import type { CreateFileRequest, FileResponse } from "@shared/contracts";


/** Создает файл и обновляет маршрут, чтобы список файлов показал новый файл. */
export const fileCreateAction = async (
  formData: CreateFileRequest,
): ActionResponse<FileResponse> => {
  const session = await getSessionOrThrow();
  const result = await createFile(formData, session);

  if (result.status === 201) {
    refresh();

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
