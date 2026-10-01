ALTER TABLE "registry"."project" DROP CONSTRAINT "project_name_unique";--> statement-breakpoint
ALTER TABLE "registry"."project" ALTER COLUMN "name" SET DATA TYPE varchar(128);