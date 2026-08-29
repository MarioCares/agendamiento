import { DrizzleAuditLogRepository } from "@/shared/audit/persistence/drizzle-audit-log.repository";
import type { Database } from "@/shared/database/db";
import { CountActivePatientsUseCase } from "../../domain/application/use-cases/count-active-patient.use-case";
import { CreatePatientUseCase } from "../../domain/application/use-cases/create-patient.use-case";
import { ListPatientsUseCase } from "../../domain/application/use-cases/list-patients.use-case";
import { SearchPatientsUseCase } from "../../domain/application/use-cases/search-patients.use-case";
import { SetPatientActiveUseCase } from "../../domain/application/use-cases/set-patient-active.use-case";
import { UpdatePatientUseCase } from "../../domain/application/use-cases/update-patient.use-case";
import { DrizzlePatientRepository } from "../../domain/infrastructure/persistence/drizzle-patient.repository";

export function patientComposition(db: Database) {
	const patientRepository = new DrizzlePatientRepository(db);
	const auditLogRepository = new DrizzleAuditLogRepository(db);

	return {
		createPatientUseCase: new CreatePatientUseCase(
			patientRepository,
			auditLogRepository,
		),
		listPatientsUseCase: new ListPatientsUseCase(patientRepository),
		searchPatientsUseCase: new SearchPatientsUseCase(patientRepository),
		setPatientActiveUseCase: new SetPatientActiveUseCase(
			patientRepository,
			auditLogRepository,
		),
		updatePatientUseCase: new UpdatePatientUseCase(
			patientRepository,
			auditLogRepository,
		),
		countActivePatientsUseCase: new CountActivePatientsUseCase(
			patientRepository,
		),
	};
}
