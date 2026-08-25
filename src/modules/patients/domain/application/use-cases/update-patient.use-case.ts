import type { UpdatePatientInput } from "@/modules/patients/backend/dto/input-update-patient.dto";
import type { AuditLogRepository } from "@/shared/audit/audit-log.repository";
import type { Patient } from "../../entities/patient.entity";
import { PatientAlreadyExistsError } from "../../errors/patient-already-exists.error";
import { PatientNotFoundError } from "../../errors/patient-not-found.error";
import type { PatientRepository } from "../../repositories/patient.repository";
import { PatientId } from "../../value-objects/patient-id.vo";
import { PatientName } from "../../value-objects/patient-name.vo";
import { PatientRut } from "../../value-objects/patient-rut.vo";

export class UpdatePatientUseCase {
	constructor(
		private readonly patientRepository: PatientRepository,
		private readonly auditLogRepository: AuditLogRepository,
	) {}

	async execute(input: UpdatePatientInput): Promise<Patient> {
		const id = PatientId.create(input.id);
		const patient = await this.patientRepository.findById(id);

		if (!patient) {
			throw new PatientNotFoundError();
		}

		const name = PatientName.create(input.name);
		const rut = input.rut ? PatientRut.create(input.rut) : undefined;

		if (rut) {
			const existing = await this.patientRepository.findByRut(rut);

			if (existing && existing.id.value !== patient.id.value) {
				throw new PatientAlreadyExistsError();
			}
		}

		const before = {
			name: patient.name.value,
			rut: patient.rut?.value ?? null,
			phone: patient.phone,
			email: patient.email,
			birthDate: patient.birthDate,
			notes: patient.notes,
			active: patient.active,
		};

		patient.rename(name);
		patient.changeRut(rut);
		patient.changePhone(input.phone);
		patient.changeEmail(input.email);
		patient.changeBirthDate(input.birthDate);
		patient.changeNotes(input.notes);

		await this.patientRepository.update(patient);

		try {
			await this.auditLogRepository.create({
				entityType: "patient",
				entityId: patient.id.value,
				action: "update",
				userId: input.actorId,
				before,
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
