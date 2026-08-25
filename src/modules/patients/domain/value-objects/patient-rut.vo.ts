import { InvalidPatientRutError } from "../errors/invalid-patient-rut.error";

export class PatientRut {
	private constructor(public readonly value: string) {}

	static create(value: string) {
		const normalized = value.trim().toUpperCase().replace(/\./g, "");

		if (!normalized) {
			throw new InvalidPatientRutError();
		}

		return new PatientRut(normalized);
	}
}
