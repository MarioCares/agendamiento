import type { Patient } from "../entities/patient.entity";
import type { PatientId } from "../value-objects/patient-id.vo";
import type { PatientRut } from "../value-objects/patient-rut.vo";

export interface PatientRepository {
	findById(id: PatientId): Promise<Patient | null>;
	findByRut(rut: PatientRut): Promise<Patient | null>;
	list(): Promise<Patient[]>;
	search(query: string): Promise<Patient[]>;
	create(patient: Patient): Promise<void>;
	update(patient: Patient): Promise<void>;
}
