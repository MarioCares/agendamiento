import type { SetScheduleRuleActiveInput } from "@/modules/scheduling/backend/dto/input-set-schedule-rule-active.dto";
import type { AuditLogRepository } from "@/shared/audit/audit-log.repository";
import type { ScheduleRule } from "../../entities/schedule-rule.entity";
import { ScheduleRuleNotFoundError } from "../../errors/schedule-rule-not-found.error";
import { ScheduleRuleOverlapError } from "../../errors/schedule-rule-overlap.error";
import type { ScheduleRuleRepository } from "../../repositories/schedule-rule.repository";
import { ScheduleRuleId } from "../../value-objects/schedule-rule-id.vo";

export class SetScheduleRuleActiveUseCase {
	constructor(
		private readonly scheduleRuleRepository: ScheduleRuleRepository,
		private readonly auditLogRepository: AuditLogRepository,
	) {}

	async execute(input: SetScheduleRuleActiveInput): Promise<ScheduleRule> {
		const id = ScheduleRuleId.create(input.id);

		const scheduleRule = await this.scheduleRuleRepository.findById(id);

		if (!scheduleRule) {
			throw new ScheduleRuleNotFoundError();
		}

		if (input.active && !scheduleRule.active) {
			const overlapping = await this.scheduleRuleRepository.findOverlapping({
				dayOfWeek: scheduleRule.dayOfWeek,
				startTime: scheduleRule.startTime,
				endTime: scheduleRule.endTime,
				excludeId: scheduleRule.id,
			});

			if (overlapping.length > 0) {
				throw new ScheduleRuleOverlapError();
			}
		}

		const before = {
			active: scheduleRule.active,
		};

		if (input.active) {
			scheduleRule.activate();
		} else {
			scheduleRule.deactivate();
		}

		await this.scheduleRuleRepository.update(scheduleRule);

		try {
			await this.auditLogRepository.create({
				entityType: "schedule_rule",
				entityId: scheduleRule.id.value,
				action: "update",
				userId: input.actorId,
				before,
				after: {
					active: scheduleRule.active,
				},
			});
		} catch (error) {
			console.error("Failed to create schedule rule audit log", error);
		}

		return scheduleRule;
	}
}
