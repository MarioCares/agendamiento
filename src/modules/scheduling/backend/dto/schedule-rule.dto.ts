import type { ScheduleRule } from "../../domain/entities/schedule-rule.entity";

export type ScheduleRuleDto = {
	id: string;
	dayOfWeek: string;
	startTime: string;
	endTime: string;
	active: boolean;
};

export function toScheduleRuleDto(rule: ScheduleRule): ScheduleRuleDto {
	return {
		id: rule.id.value,
		dayOfWeek: rule.dayOfWeek,
		startTime: rule.startTime.value,
		endTime: rule.endTime.value,
		active: rule.active,
	};
}
