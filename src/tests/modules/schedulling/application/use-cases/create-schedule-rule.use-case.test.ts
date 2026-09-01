import { beforeEach, describe, expect, it } from "vitest";
import { CreateScheduleRuleUseCase } from "@/modules/scheduling/domain/application/use-cases/create-schedule-rule.use-case";
import { ScheduleRuleOverlapError } from "@/modules/scheduling/domain/errors/schedule-rule-overlap.error";
import { InMemoryAuditLogRepository } from "@/tests/shared/audit/in-memory-audit-log.repository";
import { InMemoryScheduleRuleRepository } from "../../repositories/in-memory-schedule-rule.repository";

describe("CreateScheduleRuleUseCase", () => {
	let repository: InMemoryScheduleRuleRepository;
	let auditRepository: InMemoryAuditLogRepository;
	let useCase: CreateScheduleRuleUseCase;

	beforeEach(() => {
		repository = new InMemoryScheduleRuleRepository();
		auditRepository = new InMemoryAuditLogRepository();

		useCase = new CreateScheduleRuleUseCase(repository, auditRepository);
	});

	it("should create a schedule rule", async () => {
		const result = await useCase.execute({
			dayOfWeek: "monday",
			startTime: "09:00",
			endTime: "13:00",
			actorId: "user-1",
		});

		expect(repository.items).toHaveLength(1);
		expect(result.dayOfWeek).toBe("monday");
		expect(result.startTime.value).toBe("09:00");
		expect(result.endTime.value).toBe("13:00");
		expect(result.active).toBe(true);
	});

	it("should allow adjacent schedule rules", async () => {
		await useCase.execute({
			dayOfWeek: "monday",
			startTime: "09:00",
			endTime: "13:00",
			actorId: "user-1",
		});

		await expect(
			useCase.execute({
				dayOfWeek: "monday",
				startTime: "13:00",
				endTime: "18:00",
				actorId: "user-1",
			}),
		).resolves.toBeDefined();

		expect(repository.items).toHaveLength(2);
	});

	it("should reject overlapping schedule rules", async () => {
		await useCase.execute({
			dayOfWeek: "monday",
			startTime: "09:00",
			endTime: "13:00",
			actorId: "user-1",
		});

		await expect(
			useCase.execute({
				dayOfWeek: "monday",
				startTime: "12:00",
				endTime: "15:00",
				actorId: "user-1",
			}),
		).rejects.toBeInstanceOf(ScheduleRuleOverlapError);

		expect(repository.items).toHaveLength(1);
	});

	it("should allow same time range on another day", async () => {
		await useCase.execute({
			dayOfWeek: "monday",
			startTime: "09:00",
			endTime: "13:00",
			actorId: "user-1",
		});

		await expect(
			useCase.execute({
				dayOfWeek: "tuesday",
				startTime: "09:00",
				endTime: "13:00",
				actorId: "user-1",
			}),
		).resolves.toBeDefined();
	});

	it("should create an audit log", async () => {
		const result = await useCase.execute({
			dayOfWeek: "monday",
			startTime: "09:00",
			endTime: "13:00",
			actorId: "user-123",
		});

		expect(auditRepository.items).toHaveLength(1);

		expect(auditRepository.items[0]).toMatchObject({
			entityType: "schedule_rule",
			entityId: result.id.value,
			action: "create",
			userId: "user-123",
			after: {
				dayOfWeek: "monday",
				startTime: "09:00",
				endTime: "13:00",
				active: true,
			},
		});
	});
});
