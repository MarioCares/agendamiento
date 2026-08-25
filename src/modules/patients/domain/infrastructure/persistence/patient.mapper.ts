import { Patient } from "../../entities/patient.entity";
import { PatientId } from "../../value-objects/patient-id.vo";
import { PatientName } from "../../value-objects/patient-name.vo";
import { PatientRut } from "../../value-objects/patient-rut.vo";
import type { patients } from "./patients.schema";

export function toDomainPatient(row: typeof patients.$inferSelect): Patient {
	return Patient.create({
		id: PatientId.create(row.id),
		name: PatientName.create(row.name),
		rut: row.rut ? PatientRut.create(row.rut) : undefined,
		phone: row.phone,
		email: row.email,
		birthDate: row.birthDate ?? undefined,
		notes: row.notes,
		active: row.active,
	});
}

export function toPersistencePatient(patient: Patient) {
	return {
		id: patient.id.value,
		name: patient.name.value,
		rut: patient.rut?.value ?? null,
		phone: patient.phone,
		email: patient.email,
		birthDate: patient.birthDate,
		notes: patient.notes,
		active: patient.active,
	};
}
