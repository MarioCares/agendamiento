import { ExamType } from "@/modules/exams/domain/entities/exam-type.entity";
import { ExamTypeRepository } from "@/modules/exams/domain/repositories/exam-type.repository";
import { ExamTypeName } from "@/modules/exams/domain/value-objects/exam-name.entity";
import { ExamTypeId } from "@/modules/exams/domain/value-objects/exam-type-id.vo";

export class InMemoryExamTypeRepository implements ExamTypeRepository {
	items: ExamType[] = [];

	async findById(id: ExamTypeId): Promise<ExamType | null> {
		return this.items.find((item) => item.id.value === id.value) ?? null;
	}

	async findByName(name: ExamTypeName): Promise<ExamType | null> {
	return (
		this.items.find(
			(item) =>
				item.name.normalizedValue === name.normalizedValue,
		) ?? null
	);
}

	async list(): Promise<ExamType[]> {
		return this.items;
	}

	async create(examType: ExamType): Promise<void> {
		this.items.push(examType);
	}

	async update(examType: ExamType): Promise<void> {
		const index = this.items.findIndex(
			(item) => item.id.value === examType.id.value,
		);

		if (index >= 0) {
			this.items[index] = examType;
		}
	}
}