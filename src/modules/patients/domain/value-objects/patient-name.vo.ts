import { InvalidPatientNameError } from "../errors/invalid-patient-name.error";

export class PatientName {
	private constructor(public readonly value: string) {}

	static create(value: string) {
		const normalized = value.trim().replace(/\s+/g, " ");

		if (normalized.length < 2) {
			throw new InvalidPatientNameError();
		}

		return new PatientName(normalized);
	}
}
