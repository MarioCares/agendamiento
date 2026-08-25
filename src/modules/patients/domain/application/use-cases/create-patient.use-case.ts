import type { CreatePatientInput } from "@/modules/patients/backend/dto/input-create-patient.dto";
import type { AuditLogRepository } from "@/shared/audit/audit-log.repository";
import { Patient } from "../../entities/patient.entity";
import { PatientAlreadyExistsError } from "../../errors/patient-already-exists.error";
import type { PatientRepository } from "../../repositories/patient.repository";
import { PatientId } from "../../value-objects/patient-id.vo";
import { PatientName } from "../../value-objects/patient-name.vo";
import { PatientRut } from "../../value-objects/patient-rut.vo";

export class CreatePatientUseCase {
	constructor(
		private readonly patientRepository: PatientRepository,
		private readonly auditLogRepository: AuditLogRepository,
	) {}

	async execute(input: CreatePatientInput): Promise<Patient> {
		const name = PatientName.create(input.name);
		const rut = input.rut ? PatientRut.create(input.rut) : undefined;

		if (rut) {
			const existing = await this.patientRepository.findByRut(rut);

			if (existing) {
				throw new PatientAlreadyExistsError();
			}
		}

		const patient = Patient.create({
			id: PatientId.create(crypto.randomUUID()),
			name,
			rut,
			phone: input.phone,
			email: input.email,
			birthDate: input.birthDate,
			notes: input.notes,
		});

		await this.patientRepository.create(patient);

		try {
			await this.auditLogRepository.create({
				entityType: "patient",
				entityId: patient.id.value,
				action: "create",
				userId: input.actorId,
				after: {
					name: patient.name.value,
					rut: patient.rut?.value ?? null,
					phone: patient.phone,
					email: patient.email,
					birthDate: patient.birthDate,
					notes: patient.notes,
					active: patient.active,
				},
			});
		} catch (error) {
			console.error("Failed to create patient audit log", error);
		}

		return patient;
	}
}
