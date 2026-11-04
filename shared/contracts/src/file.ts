import * as v from "valibot";


// Принимает имя проекта, путь и непустое содержимое нового файла.
export const CreateFileRequestSchema = v.object({
  projectName: v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(128),
  ),
  path: v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(255),
  ),
  content: v.pipe(
    v.string(),
    v.minLength(1),
  ),
});
export type CreateFileRequest = v.InferInput<typeof CreateFileRequestSchema>;

export const FileResponseSchema = v.object({
  id: v.number(),
  projectId: v.number(),
  path: v.string(),
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
