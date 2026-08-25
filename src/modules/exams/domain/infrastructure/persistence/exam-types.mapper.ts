import type { examTypes } from "@/modules/exams/domain/infrastructure/persistence/exam-types.schema";
import { ExamType } from "../../entities/exam-type.entity";
import { ExamTypeName } from "../../value-objects/exam-name.vo";
import { ExamTypeId } from "../../value-objects/exam-type-id.vo";

export function toDomainExamType(row: typeof examTypes.$inferSelect): ExamType {
	return ExamType.create({
		id: ExamTypeId.create(row.id),
		name: ExamTypeName.create(row.name),
		durationMinutes: row.durationMinutes,
		description: row.description,
		instructions: row.instructions,
		active: row.active,
	});
}

export function toPersistenceExamType(examType: ExamType) {
	return {
		id: examType.id.value,
		name: examType.name.value,
		durationMinutes: examType.durationMinutes,
		description: examType.description,
		instructions: examType.instructions,
		active: examType.active,
	};
}
