import { beforeEach, describe, expect, it } from "vitest";
import { CreateScheduleRuleUseCase } from "@/modules/scheduling/domain/application/use-cases/create-schedule-rule.use-case";
import { SetScheduleRuleActiveUseCase } from "@/modules/scheduling/domain/application/use-cases/set-schedule-rule-active.use-case";
import { ScheduleRuleNotFoundError } from "@/modules/scheduling/domain/errors/schedule-rule-not-found.error";
import { ScheduleRuleOverlapError } from "@/modules/scheduling/domain/errors/schedule-rule-overlap.error";
import { InMemoryAuditLogRepository } from "@/tests/shared/audit/in-memory-audit-log.repository";
import { InMemoryScheduleRuleRepository } from "../../repositories/in-memory-schedule-rule.repository";

describe("SetScheduleRuleActiveUseCase", () => {
	let repository: InMemoryScheduleRuleRepository;
	let auditRepository: InMemoryAuditLogRepository;
	let createUseCase: CreateScheduleRuleUseCase;
	let useCase: SetScheduleRuleActiveUseCase;

	beforeEach(() => {
		repository = new InMemoryScheduleRuleRepository();
		auditRepository = new InMemoryAuditLogRepository();

		createUseCase = new CreateScheduleRuleUseCase(repository, auditRepository);

		useCase = new SetScheduleRuleActiveUseCase(repository, auditRepository);
	});

	it("should deactivate a schedule rule", async () => {
		const rule = await createUseCase.execute({
			dayOfWeek: "monday",
			startTime: "09:00",
			endTime: "13:00",
			actorId: "user-1",
		});

		const result = await useCase.execute({
			id: rule.id.value,
			active: false,
			actorId: "user-1",
		});

		expect(result.active).toBe(false);
	});

	it("should reactivate a schedule rule when there is no overlap", async () => {
		const rule = await createUseCase.execute({
			dayOfWeek: "monday",
			startTime: "09:00",
			endTime: "13:00",
			actorId: "user-1",
		});

		await useCase.execute({
			id: rule.id.value,
			active: false,
			actorId: "user-1",
		});

		const result = await useCase.execute({
			id: rule.id.value,
			active: true,
			actorId: "user-1",
		});

		expect(result.active).toBe(true);
	});

	it("should reject reactivation when there is an overlapping active rule", async () => {
		const first = await createUseCase.execute({
			dayOfWeek: "monday",
			startTime: "09:00",
			endTime: "13:00",
			actorId: "user-1",
		});

		await useCase.execute({
			id: first.id.value,
			active: false,
			actorId: "user-1",
		});

		await createUseCase.execute({
			dayOfWeek: "monday",
			startTime: "10:00",
			endTime: "14:00",
			actorId: "user-1",
		});

		await expect(
			useCase.execute({
				id: first.id.value,
				active: true,
				actorId: "user-1",
			}),
		).rejects.toBeInstanceOf(ScheduleRuleOverlapError);

		expect(first.active).toBe(false);
	});

	it("should throw when schedule rule does not exist", async () => {
		await expect(
			useCase.execute({
				id: "missing-rule",
				active: false,
				actorId: "user-1",
			}),
		).rejects.toBeInstanceOf(ScheduleRuleNotFoundError);
	});

	it("should create an audit log when status changes", async () => {
		const rule = await createUseCase.execute({
			dayOfWeek: "monday",
			startTime: "09:00",
			endTime: "13:00",
			actorId: "user-1",
		});

		auditRepository.items = [];

		await useCase.execute({
			id: rule.id.value,
			active: false,
			actorId: "user-2",
		});

		expect(auditRepository.items).toHaveLength(1);

		expect(auditRepository.items[0]).toMatchObject({
			entityType: "schedule_rule",
			entityId: rule.id.value,
			action: "update",
			userId: "user-2",
			before: {
				active: true,
			},
			after: {
				active: false,
			},
		});
	});
});
