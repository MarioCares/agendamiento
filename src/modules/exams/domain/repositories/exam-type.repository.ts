import type { ExamType } from "../entities/exam-type.entity";
import type { ExamTypeName } from "../value-objects/exam-name.entity";
import type { ExamTypeId } from "../value-objects/exam-type-id.vo";

export interface ExamTypeRepository {
	findById(id: ExamTypeId): Promise<ExamType | null>;
	findByName(name: ExamTypeName): Promise<ExamType | null>;
	list(): Promise<ExamType[]>;
	create(examype: ExamType): Promise<void>;
	update(examType: ExamType): Promise<void>;
}
