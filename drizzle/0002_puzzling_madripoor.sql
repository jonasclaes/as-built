ALTER TABLE "projects" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tenants" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tenants" ADD COLUMN "database_url" varchar(256) NOT NULL;