import type { DayOfWeek } from "@/modules/scheduling/domain/entities/dayof-week.vo";
import type { ScheduleRule } from "@/modules/scheduling/domain/entities/schedule-rule.entity";
import type { ScheduleRuleRepository } from "@/modules/scheduling/domain/repositories/schedule-rule.repository";
import type { ScheduleRuleId } from "@/modules/scheduling/domain/value-objects/schedule-rule-id.vo";
import type { TimeOfDay } from "@/modules/scheduling/domain/value-objects/timeof-day.vo";

export class InMemoryScheduleRuleRepository implements ScheduleRuleRepository {
	items: ScheduleRule[] = [];

	async findById(id: ScheduleRuleId): Promise<ScheduleRule | null> {
		return this.items.find((item) => item.id.value === id.value) ?? null;
	}

	async list(): Promise<ScheduleRule[]> {
		return this.items;
	}

	async findOverlapping(params: {
		dayOfWeek: DayOfWeek;
		startTime: TimeOfDay;
		endTime: TimeOfDay;
		excludeId?: ScheduleRuleId;
	}): Promise<ScheduleRule[]> {
		return this.items.filter((item) => {
			if (!item.active) {
				return false;
			}

			if (item.dayOfWeek !== params.dayOfWeek) {
				return false;
			}

			if (params.excludeId && item.id.value === params.excludeId.value) {
				return false;
			}

			return (
				params.startTime.value < item.endTime.value &&
				params.endTime.value > item.startTime.value
			);
		});
	}

	async create(scheduleRule: ScheduleRule): Promise<void> {
		this.items.push(scheduleRule);
	}

	async update(scheduleRule: ScheduleRule): Promise<void> {
		const index = this.items.findIndex(
			(item) => item.id.value === scheduleRule.id.value,
		);

		if (index >= 0) {
			this.items[index] = scheduleRule;
		}
	}
}
