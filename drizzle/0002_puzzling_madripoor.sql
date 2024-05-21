ALTER TABLE "projects" ALTER COLUMN "name" SET NOT Nclient.js?v=489f9366:2639 Preloading data for /clients failed with the following error: relation "clients" does not exist
If this error is transient, you can ignore it. Otherwise, consider disabling preloading for this route. This route was preloaded due to a data-sveltekit-preload-data attribute. See https://kit.svelte.dev/docs/link-options for more infoULL;--> statement-breakpoint
ALTER TABLE "tenants" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tenants" ADD COLUMN "database_url" varchar(256) NOT NULL;