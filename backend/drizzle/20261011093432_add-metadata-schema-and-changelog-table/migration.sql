CREATE SCHEMA "metadata";
--> statement-breakpoint
CREATE TABLE "metadata"."changelog" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "metadata"."changelog_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"title" varchar(128) NOT NULL
);
