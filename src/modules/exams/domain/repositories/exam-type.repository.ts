import { ExamType } from "../entities/exam-type.entity";
import { ExamTypeName } from "../value-objects/exam-name.entity";
import { ExamTypeId } from "../value-objects/exam-type-id.vo";

export interface ExamTypeRepository {
	findById(id: ExamTypeId): Promise<ExamType | null>;
	findByName(name: ExamTypeName): Promise<ExamType | null>;
	list(): Promise<ExamType[]>;
	create(examype: ExamType): Promise<void>;
	update(examType: ExamType): Promise<void>;
}