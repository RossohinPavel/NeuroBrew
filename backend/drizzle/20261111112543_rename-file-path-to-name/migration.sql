ALTER TABLE "registry"."file" RENAME COLUMN "path" TO "name";--> statement-breakpoint
ALTER INDEX "registry"."file_project_id_path_unique" RENAME TO "file_project_id_name_unique";--> statement-breakpoint
ALTER TABLE "registry"."file" ALTER COLUMN "name" SET DATA TYPE varchar(128) USING "name"::varchar(128);