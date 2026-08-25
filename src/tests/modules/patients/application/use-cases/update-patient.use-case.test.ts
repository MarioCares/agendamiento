import { beforeEach, describe, expect, it } from "vitest";
import { CreatePatientUseCase } from "@/modules/patients/domain/application/use-cases/create-patient.use-case";
import { UpdatePatientUseCase } from "@/modules/patients/domain/application/use-cases/update-patient.use-case";
import { PatientAlreadyExistsError } from "@/modules/patients/domain/errors/patient-already-exists.error";
import { PatientNotFoundError } from "@/modules/patients/domain/errors/patient-not-found.error";
import { InMemoryAuditLogRepository } from "@/tests/shared/audit/in-memory-audit-log.repository";
import { InMemoryPatientRepository } from "../../repositories/in-memory-patients.repository";

describe("UpdatePatientUseCase", () => {
	let patientRepository: InMemoryPatientRepository;
	let auditLogRepository: InMemoryAuditLogRepository;
	let createPatient: CreatePatientUseCase;
	let useCase: UpdatePatientUseCase;

	beforeEach(() => {
		patientRepository = new InMemoryPatientRepository();
		auditLogRepository = new InMemoryAuditLogRepository();

		createPatient = new CreatePatientUseCase(
			patientRepository,
			auditLogRepository,
		);

		useCase = new UpdatePatientUseCase(patientRepository, auditLogRepository);
	});

	it("should update a patient", async () => {
		const patient = await createPatient.execute({
			name: "Juan Pérez",
			rut: "12345678-5",
			phone: "+56911111111",
			email: "juan@example.com",
			actorId: "user-1",
		});

		const result = await useCase.execute({
			id: patient.id.value,
			name: "Juan Carlos Pérez",
			rut: "12345678-5",
			phone: "+56999999999",
			email: "nuevo@example.com",
			notes: "Paciente actualizado",
			actorId: "user-2",
		});

		expect(result.name.value).toBe("Juan Carlos Pérez");
		expect(result.phone).toBe("+56999999999");
		expect(result.email).toBe("nuevo@example.com");
		expect(result.notes).toBe("Paciente actualizado");
	});

	it("should throw when patient does not exist", async () => {
		await expect(
			useCase.execute({
				id: "missing-patient",
				name: "Juan Pérez",
				phone: "+56911111111",
				actorId: "user-1",
			}),
		).rejects.toBeInstanceOf(PatientNotFoundError);
	});

	it("should allow keeping the same rut", async () => {
		const patient = await createPatient.execute({
			name: "Juan Pérez",
			rut: "12345678-5",
			phone: "+56911111111",
			actorId: "user-1",
		});

		await expect(
			useCase.execute({
				id: patient.id.value,
				name: "Juan Pérez",
				rut: "12345678-5",
				phone: "+56999999999",
				actorId: "user-1",
			}),
		).resolves.toBeDefined();
	});

	it("should reject a rut used by another patient", async () => {
		const first = await createPatient.execute({
			name: "Juan Pérez",
			rut: "12345678-5",
			phone: "+56911111111",
			actorId: "user-1",
		});

		await createPatient.execute({
			name: "María Soto",
			rut: "11111111-1",
			phone: "+56922222222",
			actorId: "user-1",
		});

		await expect(
			useCase.execute({
				id: first.id.value,
				name: "Juan Pérez",
				rut: "11111111-1",
				phone: "+56911111111",
				actorId: "user-1",
			}),
		).rejects.toBeInstanceOf(PatientAlreadyExistsError);
	});

	it("should create an audit log with before and after", async () => {
		const patient = await createPatient.execute({
			name: "Juan Pérez",
			rut: "12345678-5",
			phone: "+56911111111",
			actorId: "user-1",
		});

		auditLogRepository.items = [];

		await useCase.execute({
			id: patient.id.value,
			name: "Juan Carlos Pérez",
			rut: "12345678-5",
			phone: "+56999999999",
			actorId: "user-2",
		});

		expect(auditLogRepository.items).toHaveLength(1);

		expect(auditLogRepository.items[0]).toMatchObject({
			entityType: "patient",
			entityId: patient.id.value,
			action: "update",
			userId: "user-2",
			before: {
				name: "Juan Pérez",
				phone: "+56911111111",
			},
			after: {
				name: "Juan Carlos Pérez",
				phone: "+56999999999",
			},
		});
	});
});
