import { describe, expect, it } from "vitest";
import { CreateScheduleRuleUseCase } from "@/modules/scheduling/domain/application/use-cases/create-schedule-rule.use-case";
import { ListScheduleRulesUseCase } from "@/modules/scheduling/domain/application/use-cases/list-schedule-rules.use-case";
import { InMemoryAuditLogRepository } from "@/tests/shared/audit/in-memory-audit-log.repository";
import { InMemoryScheduleRuleRepository } from "../../repositories/in-memory-schedule-rule.repository";

describe("ListScheduleRulesUseCase", () => {
	it("should list schedule rules", async () => {
		const repository = new InMemoryScheduleRuleRepository();
		const auditRepository = new InMemoryAuditLogRepository();

		const create = new CreateScheduleRuleUseCase(repository, auditRepository);

		await create.execute({
			dayOfWeek: "monday",
			startTime: "09:00",
			endTime: "13:00",
			actorId: "user-1",
		});

		await create.execute({
			dayOfWeek: "tuesday",
			startTime: "09:00",
			endTime: "13:00",
			actorId: "user-1",
		});

		const useCase = new ListScheduleRulesUseCase(repository);

		const result = await useCase.execute();

		expect(result).toHaveLength(2);
	});
});
