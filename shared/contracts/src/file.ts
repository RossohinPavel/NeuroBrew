import * as v from "valibot";


// Принимает имя проекта, тип, имя и содержимое нового файла.
export const CreateFileRequestSchema = v.object({
  projectName: v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(128),
  ),
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
