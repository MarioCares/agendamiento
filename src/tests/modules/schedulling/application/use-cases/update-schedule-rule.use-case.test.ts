import { beforeEach, describe, expect, it } from "vitest";
import { CreateScheduleRuleUseCase } from "@/modules/scheduling/domain/application/use-cases/create-schedule-rule.use-case";
import { UpdateScheduleRuleUseCase } from "@/modules/scheduling/domain/application/use-cases/update-schedule-rule.use-case";
import { ScheduleRuleNotFoundError } from "@/modules/scheduling/domain/errors/schedule-rule-not-found.error";
import { ScheduleRuleOverlapError } from "@/modules/scheduling/domain/errors/schedule-rule-overlap.error";
import { InMemoryAuditLogRepository } from "@/tests/shared/audit/in-memory-audit-log.repository";
import { InMemoryScheduleRuleRepository } from "../../repositories/in-memory-schedule-rule.repository";

describe("UpdateScheduleRuleUseCase", () => {
	let repository: InMemoryScheduleRuleRepository;
	let auditRepository: InMemoryAuditLogRepository;
	let createUseCase: CreateScheduleRuleUseCase;
	let useCase: UpdateScheduleRuleUseCase;

	beforeEach(() => {
		repository = new InMemoryScheduleRuleRepository();
		auditRepository = new InMemoryAuditLogRepository();

		createUseCase = new CreateScheduleRuleUseCase(repository, auditRepository);

		useCase = new UpdateScheduleRuleUseCase(repository, auditRepository);
	});

	it("should update a schedule rule", async () => {
		const rule = await createUseCase.execute({
			dayOfWeek: "monday",
			startTime: "09:00",
			endTime: "13:00",
			actorId: "user-1",
		});

		const result = await useCase.execute({
			id: rule.id.value,
			dayOfWeek: "monday",
			startTime: "10:00",
			endTime: "14:00",
			actorId: "user-2",
		});

		expect(result.startTime.value).toBe("10:00");
		expect(result.endTime.value).toBe("14:00");
	});

	it("should allow updating without conflicting with itself", async () => {
		const rule = await createUseCase.execute({
			dayOfWeek: "monday",
			startTime: "09:00",
			endTime: "13:00",
			actorId: "user-1",
		});

		await expect(
			useCase.execute({
				id: rule.id.value,
				dayOfWeek: "monday",
				startTime: "09:00",
				endTime: "13:00",
				actorId: "user-1",
			}),
		).resolves.toBeDefined();
	});

	it("should reject overlap with another active rule", async () => {
		const first = await createUseCase.execute({
			dayOfWeek: "monday",
			startTime: "09:00",
			endTime: "13:00",
			actorId: "user-1",
		});

		await createUseCase.execute({
			dayOfWeek: "monday",
			startTime: "14:00",
			endTime: "18:00",
			actorId: "user-1",
		});

		await expect(
			useCase.execute({
				id: first.id.value,
				dayOfWeek: "monday",
				startTime: "12:00",
				endTime: "15:00",
				actorId: "user-1",
			}),
		).rejects.toBeInstanceOf(ScheduleRuleOverlapError);
	});

	it("should throw when schedule rule does not exist", async () => {
		await expect(
			useCase.execute({
				id: "missing-rule",
				dayOfWeek: "monday",
				startTime: "09:00",
				endTime: "13:00",
				actorId: "user-1",
			}),
		).rejects.toBeInstanceOf(ScheduleRuleNotFoundError);
	});

	it("should audit before and after", async () => {
		const rule = await createUseCase.execute({
			dayOfWeek: "monday",
			startTime: "09:00",
			endTime: "13:00",
			actorId: "user-1",
		});

		auditRepository.items = [];

		await useCase.execute({
			id: rule.id.value,
			dayOfWeek: "monday",
			startTime: "10:00",
			endTime: "14:00",
			actorId: "user-2",
		});

		expect(auditRepository.items[0]).toMatchObject({
			entityType: "schedule_rule",
			entityId: rule.id.value,
			action: "update",
			userId: "user-2",
			before: {
				dayOfWeek: "monday",
				startTime: "09:00",
				endTime: "13:00",
			},
			after: {
				dayOfWeek: "monday",
				startTime: "10:00",
				endTime: "14:00",
			},
		});
	});
});
