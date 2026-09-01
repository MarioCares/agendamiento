import type { CreateScheduleRuleInput } from "@/modules/scheduling/backend/dto/input-create-schedule-rule.dto";
import type { AuditLogRepository } from "@/shared/audit/audit-log.repository";
import { ScheduleRule } from "../../entities/schedule-rule.entity";
import { ScheduleRuleOverlapError } from "../../errors/schedule-rule-overlap.error";
import type { ScheduleRuleRepository } from "../../repositories/schedule-rule.repository";
import { ScheduleRuleId } from "../../value-objects/schedule-rule-id.vo";
import { TimeOfDay } from "../../value-objects/timeof-day.vo";

export class CreateScheduleRuleUseCase {
	constructor(
		private readonly scheduleRuleRepository: ScheduleRuleRepository,
		private readonly auditLogRepository: AuditLogRepository,
	) {}

	async execute(input: CreateScheduleRuleInput): Promise<ScheduleRule> {
		const startTime = TimeOfDay.create(input.startTime);
		const endTime = TimeOfDay.create(input.endTime);

		const overlapping = await this.scheduleRuleRepository.findOverlapping({
			dayOfWeek: input.dayOfWeek,
			startTime,
			endTime,
		});

		if (overlapping.length > 0) {
			throw new ScheduleRuleOverlapError();
		}

		const scheduleRule = ScheduleRule.create({
			id: ScheduleRuleId.create(crypto.randomUUID()),
			dayOfWeek: input.dayOfWeek,
			startTime,
			endTime,
		});

		await this.scheduleRuleRepository.create(scheduleRule);

		try {
			await this.auditLogRepository.create({
				entityType: "schedule_rule",
				entityId: scheduleRule.id.value,
				action: "create",
				userId: input.actorId,
				after: {
					dayOfWeek: scheduleRule.dayOfWeek,
					startTime: scheduleRule.startTime.value,
					endTime: scheduleRule.endTime.value,
					active: scheduleRule.active,
				},
			});
		} catch (error) {
			console.error("Failed to create schedule rule audit log", error);
		}

		return scheduleRule;
	}
}
