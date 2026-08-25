import { eq, ilike, or } from "drizzle-orm";
import type { Database } from "@/shared/database/db";
import type { Patient } from "../../entities/patient.entity";
import type { PatientRepository } from "../../repositories/patient.repository";
import type { PatientId } from "../../value-objects/patient-id.vo";
import type { PatientRut } from "../../value-objects/patient-rut.vo";
import { toDomainPatient, toPersistencePatient } from "./patient.mapper";
import { patients } from "./patients.schema";

export class DrizzlePatientRepository implements PatientRepository {
	constructor(private readonly db: Database) {}

	async findById(id: PatientId): Promise<Patient | null> {
		const [row] = await this.db
			.select()
			.from(patients)
			.where(eq(patients.id, id.value))
			.limit(1);

		return row ? toDomainPatient(row) : null;
	}

	async findByRut(rut: PatientRut): Promise<Patient | null> {
		const [row] = await this.db
			.select()
			.from(patients)
			.where(eq(patients.rut, rut.value))
			.limit(1);

		return row ? toDomainPatient(row) : null;
	}

	async list(): Promise<Patient[]> {
		const rows = await this.db.select().from(patients).orderBy(patients.name);

		return rows.map(toDomainPatient);
	}

	async search(query: string): Promise<Patient[]> {
		const normalized = query.trim();

		if (!normalized) {
			return [];
		}

		const pattern = `%${normalized}%`;
		const rows = await this.db
			.select()
			.from(patients)
			.where(
				or(
					ilike(patients.name, pattern),
					ilike(patients.rut, pattern),
					ilike(patients.phone, pattern),
				),
			)
			.orderBy(patients.name);

		return rows.map(toDomainPatient);
	}

	async create(patient: Patient): Promise<void> {
		const data = toPersistencePatient(patient);

		await this.db.insert(patients).values({
			...data,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}

	async update(patient: Patient): Promise<void> {
		const data = toPersistencePatient(patient);

		await this.db
			.update(patients)
			.set({
				name: data.name,
				rut: data.rut,
				phone: data.phone,
				email: data.email,
				birthDate: data.birthDate,
				notes: data.notes,
				active: data.active,
				updatedAt: new Date(),
			})
			.where(eq(patients.id, patient.id.value));
	}
}
