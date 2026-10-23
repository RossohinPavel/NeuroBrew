CREATE SCHEMA "users";
--> statement-breakpoint
CREATE TABLE "users"."account" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users"."account_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL UNIQUE,
	"password_hash" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users"."profile" (
	"account_id" integer PRIMARY KEY,
	"username" varchar(64) NOT NULL UNIQUE
);
--> statement-breakpoint
ALTER TABLE "users"."profile" ADD CONSTRAINT "profile_account_id_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "users"."account"("id") ON DELETE CASCADE;