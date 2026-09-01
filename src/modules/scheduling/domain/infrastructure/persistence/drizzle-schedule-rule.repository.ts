import { and, eq, ne, sql } from "drizzle-orm";
import type { Database } from "@/shared/database/db";
import type { DayOfWeek } from "../../entities/dayof-week.vo";
import type { ScheduleRule } from "../../entities/schedule-rule.entity";
import type { ScheduleRuleRepository } from "../../repositories/schedule-rule.repository";
import type { ScheduleRuleId } from "../../value-objects/schedule-rule-id.vo";
import type { TimeOfDay } from "../../value-objects/timeof-day.vo";
import {
	toDomainScheduleRule,
	toPersistenceScheduleRule,
} from "./schedule-rule.mapper";
import { scheduleRules } from "./schedule-rules.schema";

export class DrizzleScheduleRuleRepository implements ScheduleRuleRepository {
	constructor(private readonly db: Database) {}

	async findById(id: ScheduleRuleId): Promise<ScheduleRule | null> {
		const [row] = await this.db
			.select()
			.from(scheduleRules)
			.where(eq(scheduleRules.id, id.value))
			.limit(1);

		return row ? toDomainScheduleRule(row) : null;
	}

	async list(): Promise<ScheduleRule[]> {
		const rows = await this.db
			.select()
			.from(scheduleRules)
			.orderBy(scheduleRules.dayOfWeek, scheduleRules.startTime);

		return rows.map(toDomainScheduleRule);
	}

	async findOverlapping(params: {
		dayOfWeek: DayOfWeek;
		startTime: TimeOfDay;
		endTime: TimeOfDay;
		excludeId?: ScheduleRuleId;
	}): Promise<ScheduleRule[]> {
		const rows = await this.db
			.select()
			.from(scheduleRules)
			.where(
				and(
					eq(scheduleRules.dayOfWeek, params.dayOfWeek),
					eq(scheduleRules.active, true),

					sql`${params.startTime.value}::time < ${scheduleRules.endTime}`,
					sql`${params.endTime.value}::time > ${scheduleRules.startTime}`,

					params.excludeId
						? ne(scheduleRules.id, params.excludeId.value)
						: undefined,
				),
			);

		return rows.map(toDomainScheduleRule);
	}

	async create(scheduleRule: ScheduleRule): Promise<void> {
		const data = toPersistenceScheduleRule(scheduleRule);

		await this.db.insert(scheduleRules).values({
			...data,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}

	async update(scheduleRule: ScheduleRule): Promise<void> {
		const data = toPersistenceScheduleRule(scheduleRule);

		await this.db
			.update(scheduleRules)
			.set({
				dayOfWeek: data.dayOfWeek,
				startTime: data.startTime,
				endTime: data.endTime,
				active: data.active,
				updatedAt: new Date(),
			})
			.where(eq(scheduleRules.id, scheduleRule.id.value));
	}
}
