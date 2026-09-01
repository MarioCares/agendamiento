import type { DayOfWeek } from "../../domain/entities/dayof-week.vo";

export type CreateScheduleRuleInput = {
	dayOfWeek: DayOfWeek;
	startTime: string;
	endTime: string;
	actorId: string;
};
