import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 256 })
});

export type Project = typeof projects.$inferSelect;
export type ProjectInsert = typeof projects.$inferInsert;

export const tenants = pgTable('tenants', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 256 })
});

export type Tenant = typeof tenants.$inferSelect;
export type TenantInsert = typeof tenants.$inferInsert;
