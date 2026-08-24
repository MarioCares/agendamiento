import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryExamTypeRepository } from "../../repositories/in-memory-exam-type.repository";
import { CreateExamTypeUseCase } from "@/modules/exams/domain/application/use-cases/create-exam-type.use-case";
import { UpdateExamTypeUseCase } from "@/modules/exams/domain/application/use-cases/update-exam-type.use-case";
import { ExamTypeNotFoundError } from "@/modules/exams/domain/errors/exam-type-not-found.error";
import { ExamTypeAlreadyExistsError } from "@/modules/exams/domain/errors/exam-type-already-exists.error";

describe("UpdateExamTypeUseCase", () => {
	let repository: InMemoryExamTypeRepository;

	beforeEach(() => {
		repository = new InMemoryExamTypeRepository();
	});

	it("should update an exam type", async () => {
		const create = new CreateExamTypeUseCase(repository);

		const examType = await create.execute({
			name: "Campo visual",
			durationMinutes: 30,
		});

		const update = new UpdateExamTypeUseCase(repository);

		const result = await update.execute({
			id: examType.id.value,
			name: "Campo visual computarizado",
			durationMinutes: 45,
			description: "Nueva descripción",
		});

		expect(result.name.value).toBe("Campo visual computarizado");
		expect(result.durationMinutes).toBe(45);
		expect(result.description).toBe("Nueva descripción");
	});

	it("should throw when exam type does not exist", async () => {
		const useCase = new UpdateExamTypeUseCase(repository);

		await expect(
			useCase.execute({
				id: "missing",
				name: "Campo visual",
				durationMinutes: 30,
			}),
		).rejects.toBeInstanceOf(ExamTypeNotFoundError);
	});

	it("should allow keeping the same name", async () => {
		const create = new CreateExamTypeUseCase(repository);

		const examType = await create.execute({
			name: "Campo visual",
			durationMinutes: 30,
		});

		const update = new UpdateExamTypeUseCase(repository);

		await expect(
			update.execute({
				id: examType.id.value,
				name: "Campo visual",
				durationMinutes: 45,
			}),
		).resolves.toBeDefined();
	});

	it("should reject another exam type name", async () => {
		const create = new CreateExamTypeUseCase(repository);

		const first = await create.execute({
			name: "Campo visual",
			durationMinutes: 30,
		});

		await create.execute({
			name: "OCT",
			durationMinutes: 20,
		});

		const update = new UpdateExamTypeUseCase(repository);

		await expect(
			update.execute({
				id: first.id.value,
				name: "OCT",
				durationMinutes: 30,
			}),
		).rejects.toBeInstanceOf(ExamTypeAlreadyExistsError);
	});
});
