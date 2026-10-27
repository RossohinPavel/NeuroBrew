ALTER TABLE "registry"."project" RENAME COLUMN "account_id" TO "user_id";--> statement-breakpoint
ALTER INDEX "registry"."project_account_id_name_unique" RENAME TO "project_user_id_name_unique";