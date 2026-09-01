ALTER TABLE "auth"."users" ADD COLUMN "passwordHash" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "username" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "createdAt" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "updatedAt" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");