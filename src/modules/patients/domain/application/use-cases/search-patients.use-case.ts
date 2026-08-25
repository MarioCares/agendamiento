import type { SearchPatientsInput } from "@/modules/patients/backend/dto/input-search-patients.dto";
import type { Patient } from "../../entities/patient.entity";
import type { PatientRepository } from "../../repositories/patient.repository";

export class SearchPatientsUseCase {
	constructor(private readonly patientRepository: PatientRepository) {}

	async execute(input: SearchPatientsInput): Promise<Patient[]> {
		const query = input.query.trim();

		if (!query) {
			return [];
		}

		const patients = await this.patientRepository.search(query);

		if (input.includeInactive) {
			return patients;
		}

		return patients.filter((patient) => patient.active);
	}
}
