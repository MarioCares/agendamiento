import { describe, expect, it } from "vitest";
import { CreateExamTypeUseCase } from "@/modules/exams/domain/application/use-cases/create-exam-type.use-case";
import { ListExamTypesUseCase } from "@/modules/exams/domain/application/use-cases/list-exam-types.use-case";
import { InMemoryAuditLogRepository } from "@/tests/shared/audit/in-memory-audit-log.repository";
import { InMemoryExamTypeRepository } from "../../repositories/in-memory-exam-type.repository";

describe("ListExamTypesUseCase", () => {
	it("should list exam types", async () => {
		const repository = new InMemoryExamTypeRepository();
		const auditLogRepository = new InMemoryAuditLogRepository();

		const createUseCase = new CreateExamTypeUseCase(
			repository,
			auditLogRepository,
		);

		await createUseCase.execute({
			name: "Campo visual",
			durationMinutes: 30,
			actorId: "user",
		});

		await createUseCase.execute({
			name: "OCT",
			durationMinutes: 20,
			actorId: "user",
		});

		const useCase = new ListExamTypesUseCase(repository);

		const result = await useCase.execute();

		expect(result).toHaveLength(2);
	});
});
