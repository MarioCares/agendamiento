import type { PatientRepository } from "../../repositories/patient.repository";

export class CountActivePatientsUseCase {
	constructor(private readonly patientRepository: PatientRepository) {}

	async execute(): Promise<number> {
		return this.patientRepository.countActive();
	}
}
