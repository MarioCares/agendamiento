import type { CreateScheduleRuleInput } from "./input-create-schedule-rule.dto";

export type UpdateScheduleRuleInput = CreateScheduleRuleInput & {
	id: string;
};
