import { ExamType } from "../../domain/entities/exam-type.entity";

export type ExamTypeDto = {
	id: string;
	name: string;
	durationMinutes: number;
	description: string;
	instructions: string;
	active: boolean;
};

export function toDtoExamType(examType: ExamType): ExamTypeDto {
	return {
		id: examType.id.value,
		name: examType.name.value,
		durationMinutes: examType.durationMinutes,
		description: examType.description,
		instructions: examType.instructions,
		active: examType.active,
	};
}