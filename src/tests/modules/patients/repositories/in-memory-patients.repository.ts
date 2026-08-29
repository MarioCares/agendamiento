import type { Patient } from "@/modules/patients/domain/entities/patient.entity";
import type { PatientRepository } from "@/modules/patients/domain/repositories/patient.repository";
import type { PatientId } from "@/modules/patients/domain/value-objects/patient-id.vo";
import type { PatientRut } from "@/modules/patients/domain/value-objects/patient-rut.vo";

export class InMemoryPatientRepository implements PatientRepository {
	items: Patient[] = [];

	async findById(id: PatientId): Promise<Patient | null> {
		return this.items.find((item) => item.id.value === id.value) ?? null;
	}

	async findByRut(rut: PatientRut): Promise<Patient | null> {
		return this.items.find((item) => item.rut?.value === rut.value) ?? null;
	}

	async list(): Promise<Patient[]> {
		return this.items;
	}

	async search(query: string): Promise<Patient[]> {
		const normalized = query.trim().toLowerCase();

		if (!normalized) {
			return [];
		}

		return this.items.filter((item) => {
			const name = item.name.value.toLowerCase();
			const rut = item.rut?.value.toLowerCase() ?? "";
			const phone = item.phone.toLowerCase();

			return (
				name.includes(normalized) ||
				rut.includes(normalized) ||
				phone.includes(normalized)
			);
		});
	}

	async create(patient: Patient): Promise<void> {
		this.items.push(patient);
	}

	async update(patient: Patient): Promise<void> {
		const index = this.items.findIndex(
			(item) => item.id.value === patient.id.value,
		);

		if (index >= 0) {
			this.items[index] = patient;
		}
	}

	async countActive(): Promise<number> {
		return this.items.filter((patient) => patient.active).length;
	}
}
