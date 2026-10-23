ALTER TABLE "registry"."project" DROP CONSTRAINT "project_user_id_users_id_fkey";--> statement-breakpoint
DROP INDEX "registry"."project_user_id_name_unique";--> statement-breakpoint
ALTER TABLE "registry"."project" DROP COLUMN "user_id";