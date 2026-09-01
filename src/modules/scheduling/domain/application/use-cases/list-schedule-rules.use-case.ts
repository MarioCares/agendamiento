import type { ScheduleRule } from "../../entities/schedule-rule.entity";
import type { ScheduleRuleRepository } from "../../repositories/schedule-rule.repository";

export class ListScheduleRulesUseCase {
	constructor(
		private readonly scheduleRuleRepository: ScheduleRuleRepository,
	) {}

	async execute(): Promise<ScheduleRule[]> {
		return this.scheduleRuleRepository.list();
	}
}
