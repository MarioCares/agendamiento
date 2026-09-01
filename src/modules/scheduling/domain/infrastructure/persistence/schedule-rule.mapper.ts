import type { DayOfWeek } from "../../entities/dayof-week.vo";
import { ScheduleRule } from "../../entities/schedule-rule.entity";
import { ScheduleRuleId } from "../../value-objects/schedule-rule-id.vo";
import { TimeOfDay } from "../../value-objects/timeof-day.vo";
import type { ScheduleRuleRow } from "./schedule-rules.schema";

export function toDomainScheduleRule(row: ScheduleRuleRow): ScheduleRule {
	return ScheduleRule.create({
		id: ScheduleRuleId.create(row.id),
		dayOfWeek: row.dayOfWeek as DayOfWeek,
		startTime: TimeOfDay.create(row.startTime.slice(0, 5)),
		endTime: TimeOfDay.create(row.endTime.slice(0, 5)),
		active: row.active,
	});
}

export function toPersistenceScheduleRule(scheduleRule: ScheduleRule) {
	return {
		id: scheduleRule.id.value,
		dayOfWeek: scheduleRule.dayOfWeek,
		startTime: scheduleRule.startTime.value,
		endTime: scheduleRule.endTime.value,
		active: scheduleRule.active,
	};
}
