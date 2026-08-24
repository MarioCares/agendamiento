import { ExamType } from "../../entities/exam-type.entity";
import { ExamTypeAlreadyExistsError } from "../../errors/exam-type-already-exists.error";
import { ExamTypeNotFoundError } from "../../errors/exam-type-not-found.error";
import { ExamTypeRepository } from "../../repositories/exam-type.repository";
import { ExamTypeName } from "../../value-objects/exam-name.entity";
import { ExamTypeId } from "../../value-objects/exam-type-id.vo";
import { UpdateExamTypeInput } from "../dto/input-update-exam-type.dto";

export class UpdateExamTypeUseCase {
	constructor(
		private readonly examTypeRepository: ExamTypeRepository,
	) {}

	async execute(input: UpdateExamTypeInput): Promise<ExamType> {
		const id = ExamTypeId.create(input.id);
		const examType = await this.examTypeRepository.findById(id);

		if (!examType) {
			throw new ExamTypeNotFoundError();
		}

		const name = ExamTypeName.create(input.name);
		const existing = await this.examTypeRepository.findByName(name);

		if (existing && existing.id.value !== examType.id.value) {
			throw new ExamTypeAlreadyExistsError();
		}

		examType.rename(name);
		examType.changeDuration(input.durationMinutes);
		examType.changeDescription(input.description);
		examType.changeInstructions(input.instructions);

		await this.examTypeRepository.update(examType);
		return examType;
	}
}