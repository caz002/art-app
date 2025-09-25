ALTER TABLE "user" ADD COLUMN "current_streak" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "longest_streak" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "last_active" timestamp DEFAULT '0001-01-01 00:00:00.000' NOT NULL;