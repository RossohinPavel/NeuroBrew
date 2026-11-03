CREATE TABLE "registry"."file" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "registry"."file_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"project_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"path" varchar(255) NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "registry"."agentsmd";--> statement-breakpoint
DROP TABLE "registry"."rule";--> statement-breakpoint
DROP TABLE "registry"."skill";--> statement-breakpoint
CREATE UNIQUE INDEX "file_project_id_path_unique" ON "registry"."file" ("project_id","path");--> statement-breakpoint
ALTER TABLE "registry"."file" ADD CONSTRAINT "file_project_id_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "registry"."project"("id") ON DELETE CASCADE;