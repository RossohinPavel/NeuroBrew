ALTER TABLE "registry"."project" ALTER COLUMN "account_id" SET NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "project_account_id_name_unique" ON "registry"."project" ("account_id","name");