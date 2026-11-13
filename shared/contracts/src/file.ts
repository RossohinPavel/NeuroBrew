import * as v from "valibot";
import * as fields from "./fields.js";


// Определяет файл по имени владельца, названию проекта и имени файла.
export const FileGetRequestSchema = v.object({
  username: fields.UsernameInputSchema,
  projectName: fields.ProjectNameInputSchema,
  name: v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(128),
  ),
});
export type FileGetRequest = v.InferInput<typeof FileGetRequestSchema>;

// Определяет проект, файлы которого нужно получить.
export const FileListRequestSchema = v.object({
  username: fields.UsernameInputSchema,
  projectName: fields.ProjectNameInputSchema,
});
export type FileListRequest = v.InferInput<typeof FileListRequestSchema>;

// Принимает имя проекта, тип, имя и содержимое нового файла.
export const CreateFileRequestSchema = v.object({
  projectName: fields.ProjectNameInputSchema,
  type: v.picklist(["agentsmd", "skill", "rule"]),
  name: v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(128),
  ),
  content: v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(32768),
  ),
});
export type CreateFileRequest = v.InferInput<typeof CreateFileRequestSchema>;

export const FileResponseSchema = v.object({
  id: v.number(),
  projectId: v.number(),
  type: v.picklist(["agentsmd", "skill", "rule"]),
  name: v.string(),
  content: v.string(),
  createdAt: v.pipe(
    v.string(),
    v.isoTimestamp(),
  ),
  updatedAt: v.pipe(
    v.string(),
    v.isoTimestamp(),
  ),
});
export type FileResponse = v.InferOutput<typeof FileResponseSchema>;

export const FileListResponseSchema = v.array(FileResponseSchema);
export type FileListResponse = v.InferOutput<typeof FileListResponseSchema>;
