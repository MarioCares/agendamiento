import { beforeEach, describe, expect, it } from "vitest";
import { CreatePatientUseCase } from "@/modules/patients/domain/application/use-cases/create-patient.use-case";
import { PatientAlreadyExistsError } from "@/modules/patients/domain/errors/patient-already-exists.error";
import { InMemoryAuditLogRepository } from "@/tests/shared/audit/in-memory-audit-log.repository";
import { InMemoryPatientRepository } from "../../repositories/in-memory-patients.repository";

describe("CreatePatientUseCase", () => {
	let patientRepository: InMemoryPatientRepository;
	let auditLogRepository: InMemoryAuditLogRepository;
	let useCase: CreatePatientUseCase;

	beforeEach(() => {
		patientRepository = new InMemoryPatientRepository();
		auditLogRepository = new InMemoryAuditLogRepository();

		useCase = new CreatePatientUseCase(patientRepository, auditLogRepository);
	});

	it("should create a patient", async () => {
		const patient = await useCase.execute({
			name: "Juan Pérez",
			rut: "12345678-5",
			phone: "+56912345678",
			email: "juan@example.com",
			actorId: "user-1",
		});

		expect(patientRepository.items).toHaveLength(1);

		expect(patient.name.value).toBe("Juan Pérez");
		expect(patient.rut?.value).toBe("12345678-5");
		expect(patient.phone).toBe("+56912345678");
		expect(patient.email).toBe("juan@example.com");
		expect(patient.active).toBe(true);
	});

	it("should create a patient without rut", async () => {
		const patient = await useCase.execute({
			name: "John Doe",
			phone: "+56911111111",
			actorId: "user-1",
		});

		expect(patientRepository.items).toHaveLength(1);
		expect(patient.rut).toBeNull();
	});

	it("should not create a patient with duplicated rut", async () => {
		await useCase.execute({
			name: "Juan Pérez",
			rut: "12345678-5",
			phone: "+56912345678",
			actorId: "user-1",
		});

		await expect(
			useCase.execute({
				name: "Pedro Pérez",
				rut: "12345678-5",
				phone: "+56999999999",
				actorId: "user-1",
			}),
		).rejects.toBeInstanceOf(PatientAlreadyExistsError);

		expect(patientRepository.items).toHaveLength(1);
	});

	it("should create an audit log", async () => {
		const patient = await useCase.execute({
			name: "Juan Pérez",
			rut: "12345678-5",
			phone: "+56912345678",
			actorId: "user-123",
		});

		expect(auditLogRepository.items).toHaveLength(1);

		expect(auditLogRepository.items[0]).toMatchObject({
			entityType: "patient",
			entityId: patient.id.value,
			action: "create",
			userId: "user-123",
			after: {
				name: "Juan Pérez",
				rut: "12345678-5",
				phone: "+56912345678",
				active: true,
			},
		});
	});

	it("should not audit when patient creation fails", async () => {
		await useCase.execute({
			name: "Juan Pérez",
			rut: "12345678-5",
			phone: "+56912345678",
			actorId: "user-1",
		});

		auditLogRepository.items = [];

		await expect(
			useCase.execute({
				name: "Otro paciente",
				rut: "12345678-5",
				phone: "+56922222222",
				actorId: "user-1",
			}),
		).rejects.toBeInstanceOf(PatientAlreadyExistsError);

		expect(auditLogRepository.items).toHaveLength(0);
	});
});
