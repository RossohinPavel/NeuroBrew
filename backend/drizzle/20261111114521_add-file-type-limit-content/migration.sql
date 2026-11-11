CREATE TYPE "registry"."file_type" AS ENUM('agentsmd', 'skill', 'rule');--> statement-breakpoint
ALTER TABLE "registry"."file" ADD COLUMN "type" "registry"."file_type";--> statement-breakpoint
ALTER TABLE "registry"."file" ALTER COLUMN "content" SET DATA TYPE varchar(32768) USING "content"::varchar(32768);