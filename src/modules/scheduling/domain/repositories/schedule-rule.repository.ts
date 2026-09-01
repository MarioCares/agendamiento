import type { DayOfWeek } from "../entities/dayof-week.vo";
import type { ScheduleRule } from "../entities/schedule-rule.entity";
import type { ScheduleRuleId } from "../value-objects/schedule-rule-id.vo";
import type { TimeOfDay } from "../value-objects/timeof-day.vo";

export interface ScheduleRuleRepository {
	findById(id: ScheduleRuleId): Promise<ScheduleRule | null>;

	list(): Promise<ScheduleRule[]>;

	findOverlapping(params: {
		dayOfWeek: DayOfWeek;
		startTime: TimeOfDay;
		endTime: TimeOfDay;
		excludeId?: ScheduleRuleId;
	}): Promise<ScheduleRule[]>;

	create(scheduleRule: ScheduleRule): Promise<void>;

	update(scheduleRule: ScheduleRule): Promise<void>;
}
