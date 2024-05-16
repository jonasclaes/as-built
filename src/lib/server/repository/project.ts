import { eq } from 'drizzle-orm';
import { projects, type ProjectInsert } from '../database/schema/drizzle';
import type { DatabaseStrategy } from '../database/strategy';

export class ProjectRepository {
	constructor(protected readonly databaseStrategy: DatabaseStrategy) {}

	async createProject(data: ProjectInsert) {
		const drizzle = await this.databaseStrategy.getDrizzle();

		const project = await drizzle.insert(projects).values(data).returning();

		return project.at(0);
	}

	async getAllProjects() {
		const drizzle = await this.databaseStrategy.getDrizzle();

		const allProjects = await drizzle.select().from(projects).execute();

		return allProjects;
	}

	async getProjectById(projectId: number) {
		const drizzle = await this.databaseStrategy.getDrizzle();

		const allProjects = await drizzle
			.select()
			.from(projects)
			.where(eq(projects.id, projectId))
			.execute();

		return allProjects.at(0);
	}
}
