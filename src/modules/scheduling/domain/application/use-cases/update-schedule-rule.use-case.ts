import type { UpdateScheduleRuleInput } from "@/modules/scheduling/backend/dto/input-update-schedule-rule.dto";
import type { AuditLogRepository } from "@/shared/audit/audit-log.repository";
import type { ScheduleRule } from "../../entities/schedule-rule.entity";
import { ScheduleRuleNotFoundError } from "../../errors/schedule-rule-not-found.error";
import { ScheduleRuleOverlapError } from "../../errors/schedule-rule-overlap.error";
import type { ScheduleRuleRepository } from "../../repositories/schedule-rule.repository";
import { ScheduleRuleId } from "../../value-objects/schedule-rule-id.vo";
import { TimeOfDay } from "../../value-objects/timeof-day.vo";

export class UpdateScheduleRuleUseCase {
	constructor(
		private readonly scheduleRuleRepository: ScheduleRuleRepository,
		private readonly auditLogRepository: AuditLogRepository,
	) {}

	async execute(input: UpdateScheduleRuleInput): Promise<ScheduleRule> {
		const id = ScheduleRuleId.create(input.id);

		const scheduleRule = await this.scheduleRuleRepository.findById(id);

		if (!scheduleRule) {
			throw new ScheduleRuleNotFoundError();
		}

		const startTime = TimeOfDay.create(input.startTime);
		const endTime = TimeOfDay.create(input.endTime);

		/*
		 * Solo necesitamos validar conflictos si la regla
		 * actualmente está activa.
		 */
		if (scheduleRule.active) {
			const overlapping = await this.scheduleRuleRepository.findOverlapping({
				dayOfWeek: input.dayOfWeek,
				startTime,
				endTime,
				excludeId: scheduleRule.id,
			});

			if (overlapping.length > 0) {
				throw new ScheduleRuleOverlapError();
			}
		}

		const before = {
			dayOfWeek: scheduleRule.dayOfWeek,
			startTime: scheduleRule.startTime.value,
			endTime: scheduleRule.endTime.value,
			active: scheduleRule.active,
		};

		scheduleRule.changeDay(input.dayOfWeek);
		scheduleRule.changeRange(startTime, endTime);

		await this.scheduleRuleRepository.update(scheduleRule);

		try {
			await this.auditLogRepository.create({
				entityType: "schedule_rule",
				entityId: scheduleRule.id.value,
				action: "update",
				userId: input.actorId,
				before,
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
