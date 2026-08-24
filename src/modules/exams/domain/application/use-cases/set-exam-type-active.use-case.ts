import { ExamType } from "../../entities/exam-type.entity";
import { ExamTypeNotFoundError } from "../../errors/exam-type-not-found.error";
import { ExamTypeRepository } from "../../repositories/exam-type.repository";
import { ExamTypeId } from "../../value-objects/exam-type-id.vo";
import { SetExamTypeActiveInput } from "../dto/input-set-exam-type-active.dto";

export class SetExamTypeActiveUseCase {
	constructor(
		private readonly examTypeRepository: ExamTypeRepository,
	) {}

	async execute(input: SetExamTypeActiveInput): Promise<ExamType> {
		const id = ExamTypeId.create(input.id);
		const examType = await this.examTypeRepository.findById(id);

		if (!examType) {
			throw new ExamTypeNotFoundError();
		}

		if (input.active) {
			examType.activate();
		} else {
			examType.deactivate();
		}

		await this.examTypeRepository.update(examType);
		return examType;
	}
}