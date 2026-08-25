import type { SetPatientActiveInput } from "@/modules/patients/backend/dto/input-set-patient-active.dto";
import type { AuditLogRepository } from "@/shared/audit/audit-log.repository";
import type { Patient } from "../../entities/patient.entity";
import { PatientNotFoundError } from "../../errors/patient-not-found.error";
import type { PatientRepository } from "../../repositories/patient.repository";
import { PatientId } from "../../value-objects/patient-id.vo";

export class SetPatientActiveUseCase {
	constructor(
		private readonly patientRepository: PatientRepository,
		private readonly auditLogRepository: AuditLogRepository,
	) {}

	async execute(input: SetPatientActiveInput): Promise<Patient> {
		const id = PatientId.create(input.id);
		const patient = await this.patientRepository.findById(id);

		if (!patient) {
			throw new PatientNotFoundError();
		}

		const before = {
			active: patient.active,
		};

		if (input.active) {
			patient.activate();
		} else {
			patient.deactivate();
		}

		await this.patientRepository.update(patient);

		try {
			await this.auditLogRepository.create({
				entityType: "patient",
				entityId: patient.id.value,
				action: "update",
				userId: input.actorId,
				before,
				after: {
					active: patient.active,
				},
			});
		} catch (error) {
			console.error("Failed to create patient audit log", error);
		}

		return patient;
	}
}
