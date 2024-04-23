import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

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

export const clients = pgTable('clients', {
	id: serial('id').primaryKey(),
	name: varchar('clientName', { length: 256 }),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow(),
	deletedAt: timestamp('deletedAt')
});

export type Client = typeof clients.$inferSelect;
export type ClientInsert = typeof clients.$inferInsert;