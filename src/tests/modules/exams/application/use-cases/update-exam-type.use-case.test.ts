import { beforeEach, describe, expect, it } from "vitest";
import { CreateExamTypeUseCase } from "@/modules/exams/domain/application/use-cases/create-exam-type.use-case";
import { UpdateExamTypeUseCase } from "@/modules/exams/domain/application/use-cases/update-exam-type.use-case";
import { ExamTypeAlreadyExistsError } from "@/modules/exams/domain/errors/exam-type-already-exists.error";
import { ExamTypeNotFoundError } from "@/modules/exams/domain/errors/exam-type-not-found.error";
import { InMemoryAuditLogRepository } from "@/tests/shared/audit/in-memory-audit-log.repository";
import { InMemoryExamTypeRepository } from "../../repositories/in-memory-exam-type.repository";

describe("UpdateExamTypeUseCase", () => {
	let repository: InMemoryExamTypeRepository;
	let auditLogRepository: InMemoryAuditLogRepository;

	beforeEach(() => {
		repository = new InMemoryExamTypeRepository();
		auditLogRepository = new InMemoryAuditLogRepository();
	});

	it("should update an exam type", async () => {
		const create = new CreateExamTypeUseCase(repository, auditLogRepository);

		const examType = await create.execute({
			name: "Campo visual",
			durationMinutes: 30,
			actorId: "user",
		});

		const update = new UpdateExamTypeUseCase(repository, auditLogRepository);

		const result = await update.execute({
			id: examType.id.value,
			name: "Campo visual computarizado",
			durationMinutes: 45,
			description: "Nueva descripción",
			actorId: "user",
		});

		expect(result.name.value).toBe("Campo visual computarizado");
		expect(result.durationMinutes).toBe(45);
		expect(result.description).toBe("Nueva descripción");
	});

	it("should throw when exam type does not exist", async () => {
		const useCase = new UpdateExamTypeUseCase(repository, auditLogRepository);

		await expect(
			useCase.execute({
				id: "missing",
				name: "Campo visual",
				durationMinutes: 30,
				actorId: "user",
			}),
		).rejects.toBeInstanceOf(ExamTypeNotFoundError);
	});

	it("should allow keeping the same name", async () => {
		const create = new CreateExamTypeUseCase(repository, auditLogRepository);

		const examType = await create.execute({
			name: "Campo visual",
			durationMinutes: 30,
			actorId: "user",
		});

		const update = new UpdateExamTypeUseCase(repository, auditLogRepository);

		await expect(
			update.execute({
				id: examType.id.value,
				name: "Campo visual",
				durationMinutes: 45,
				actorId: "user",
			}),
		).resolves.toBeDefined();
	});

	it("should reject another exam type name", async () => {
		const create = new CreateExamTypeUseCase(repository, auditLogRepository);

		const first = await create.execute({
			name: "Campo visual",
			durationMinutes: 30,
			actorId: "user",
		});

		await create.execute({
			name: "OCT",
			durationMinutes: 20,
			actorId: "user",
		});

		const update = new UpdateExamTypeUseCase(repository, auditLogRepository);

		await expect(
			update.execute({
				id: first.id.value,
				name: "OCT",
				durationMinutes: 30,
				actorId: "user",
			}),
		).rejects.toBeInstanceOf(ExamTypeAlreadyExistsError);
	});
});
