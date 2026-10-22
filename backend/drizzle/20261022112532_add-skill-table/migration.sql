CREATE TABLE "registry"."skill" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "registry"."skill_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"project_id" integer NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" varchar(512) NOT NULL,
	"content" varchar(4096) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "registry"."skill" ADD CONSTRAINT "skill_project_id_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "registry"."project"("id") ON DELETE CASCADE;