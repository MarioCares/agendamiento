import { DrizzleAuditLogRepository } from "@/shared/audit/persistence/drizzle-audit-log.repository";
import type { Database } from "@/shared/database/db";
import { CreateScheduleRuleUseCase } from "../../domain/application/use-cases/create-schedule-rule.use-case";
import { ListScheduleRulesUseCase } from "../../domain/application/use-cases/list-schedule-rules.use-case";
import { SetScheduleRuleActiveUseCase } from "../../domain/application/use-cases/set-schedule-rule-active.use-case";
import { UpdateScheduleRuleUseCase } from "../../domain/application/use-cases/update-schedule-rule.use-case";
import { DrizzleScheduleRuleRepository } from "../../domain/infrastructure/persistence/drizzle-schedule-rule.repository";

export function scheduleRuleComposition(db: Database) {
	const scheduleRuleRepository = new DrizzleScheduleRuleRepository(db);
	const auditLogRepository = new DrizzleAuditLogRepository(db);

	return {
		createScheduleRuleUseCase: new CreateScheduleRuleUseCase(
			scheduleRuleRepository,
			auditLogRepository,
		),
		listScheduleRulesUseCase: new ListScheduleRulesUseCase(
			scheduleRuleRepository,
		),
		updateScheduleRuleUseCase: new UpdateScheduleRuleUseCase(
			scheduleRuleRepository,
			auditLogRepository,
		),
		setScheduleRuleActiveUseCase: new SetScheduleRuleActiveUseCase(
			scheduleRuleRepository,
			auditLogRepository,
		),
	};
}
