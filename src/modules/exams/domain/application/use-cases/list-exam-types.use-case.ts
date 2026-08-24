import { ExamType } from "../../entities/exam-type.entity";
import { ExamTypeRepository } from "../../repositories/exam-type.repository";

export class ListExamTypesUseCase {
	constructor(
		private readonly examTypeRepository: ExamTypeRepository,
	) {}

	async execute(): Promise<ExamType[]> {
		return this.examTypeRepository.list();
	}
}