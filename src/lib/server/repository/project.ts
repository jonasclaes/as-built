import { projects, type ProjectInsert } from '../database/schema/drizzle';
import type { DatabaseStrategy } from '../strategy/database/database';

export class ProjectRepository {
	constructor(protected readonly databaseStrategy: DatabaseStrategy) {}

	async createProject(data: ProjectInsert) {
		const drizzle = await this.databaseStrategy.getDrizzle();

		const project = await drizzle.insert(projects).values(data).returning();

		return project[0];
	}

	async getProjects() {
		const drizzle = await this.databaseStrategy.getDrizzle();

		const _projects = await drizzle.select().from(projects).execute();

		return _projects;
	}
}
