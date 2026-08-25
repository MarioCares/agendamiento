import type { ListPatientsInput } from "@/modules/patients/backend/dto/input-list-patients.dto";
import type { Patient } from "../../entities/patient.entity";
import type { PatientRepository } from "../../repositories/patient.repository";

export class ListPatientsUseCase {
	constructor(private readonly patientRepository: PatientRepository) {}

	async execute(input: ListPatientsInput = {}): Promise<Patient[]> {
		const patients = await this.patientRepository.list();

		if (input.includeInactive) {
			return patients;
		}

		return patients.filter((patient) => patient.active);
	}
}
