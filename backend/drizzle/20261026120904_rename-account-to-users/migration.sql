ALTER TABLE "users"."account" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "users"."profile" RENAME COLUMN "account_id" TO "user_id";