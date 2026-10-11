CREATE SCHEMA "registry";
--> statement-breakpoint
CREATE TABLE "registry"."project" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "registry"."project_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"name" varchar(128) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "project_user_id_name_unique" ON "registry"."project" ("user_id","name");--> statement-breakpoint
ALTER TABLE "registry"."project" ADD CONSTRAINT "project_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;