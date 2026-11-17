UPDATE "registry"."project" AS project
SET "updated_at" = COALESCE(
  (
    SELECT MAX(file."updated_at")
    FROM "registry"."file" AS file
    WHERE file."project_id" = project."id"
  ),
  project."created_at"
);
