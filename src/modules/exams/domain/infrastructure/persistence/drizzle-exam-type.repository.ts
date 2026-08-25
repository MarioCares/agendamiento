import { eq, sql } from "drizzle-orm";
import type { ExamTypeRepository } from "@/modules/exams/domain/repositories/exam-type.repository";
import type { Database } from "@/shared/database/db";
import type { ExamType } from "../../entities/exam-type.entity";
import type { ExamTypeName } from "../../value-objects/exam-name.vo";
import type { ExamTypeId } from "../../value-objects/exam-type-id.vo";
import { toDomainExamType, toPersistenceExamType } from "./exam-types.mapper";
import { examTypes } from "./exam-types.schema";

export class DrizzleExamTypeRepository implements ExamTypeRepository {
	constructor(private readonly db: Database) {}

	async findById(id: ExamTypeId): Promise<ExamType | null> {
		const [row] = await this.db
			.select()
			.from(examTypes)
			.where(eq(examTypes.id, id.value))
			.limit(1);

		return row ? toDomainExamType(row) : null;
	}

	async findByName(name: ExamTypeName): Promise<ExamType | null> {
		const [row] = await this.db
			.select()
			.from(examTypes)
			.where(sql`lower(${examTypes.name}) = lower(${name.value})`)
			.limit(1);

		return row ? toDomainExamType(row) : null;
	}

	async list(): Promise<ExamType[]> {
		const rows = await this.db.select().from(examTypes).orderBy(examTypes.name);

		return rows.map(toDomainExamType);
	}

	async create(examType: ExamType): Promise<void> {
		const data = toPersistenceExamType(examType);

		await this.db.insert(examTypes).values({
			...data,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}

	async update(examType: ExamType): Promise<void> {
		const data = toPersistenceExamType(examType);

		await this.db
			.update(examTypes)
			.set({
				name: data.name,
				durationMinutes: data.durationMinutes,
				description: data.description,
				instructions: data.instructions,
				active: data.active,
				updatedAt: new Date(),
			})
			.where(eq(examTypes.id, examType.id.value));
	}
}
