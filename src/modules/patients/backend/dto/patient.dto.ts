import type { Patient } from "../../domain/entities/patient.entity";

export type PatientDto = {
	id: string;
	name: string;
	rut: string | null;
	phone: string;
	email: string;
	birthDate: string | null;
	notes: string;
	active: boolean;
};

export function toPatientDto(patient: Patient): PatientDto {
	return {
		id: patient.id.value,
		name: patient.name.value,
		rut: patient.rut?.value ?? null,
		phone: patient.phone,
		email: patient.email,
		birthDate: patient.birthDate
			? patient.birthDate.toISOString().slice(0, 10)
			: null,
		notes: patient.notes,
		active: patient.active,
	};
}
