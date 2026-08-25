import { beforeEach, describe, expect, it } from "vitest";
import { CreatePatientUseCase } from "@/modules/patients/domain/application/use-cases/create-patient.use-case";
import { SetPatientActiveUseCase } from "@/modules/patients/domain/application/use-cases/set-patient-active.use-case";
import { PatientNotFoundError } from "@/modules/patients/domain/errors/patient-not-found.error";
import { InMemoryAuditLogRepository } from "@/tests/shared/audit/in-memory-audit-log.repository";
import { InMemoryPatientRepository } from "../../repositories/in-memory-patients.repository";

describe("SetPatientActiveUseCase", () => {
	let patientRepository: InMemoryPatientRepository;
	let auditLogRepository: InMemoryAuditLogRepository;
	let createPatient: CreatePatientUseCase;
	let useCase: SetPatientActiveUseCase;

	beforeEach(() => {
		patientRepository = new InMemoryPatientRepository();
		auditLogRepository = new InMemoryAuditLogRepository();

		createPatient = new CreatePatientUseCase(
			patientRepository,
			auditLogRepository,
		);

		useCase = new SetPatientActiveUseCase(
			patientRepository,
			auditLogRepository,
		);
	});

	it("should deactivate a patient", async () => {
		const patient = await createPatient.execute({
			name: "Juan Pérez",
			phone: "+56911111111",
			actorId: "user-1",
		});

		const result = await useCase.execute({
			id: patient.id.value,
			active: false,
			actorId: "user-1",
		});

		expect(result.active).toBe(false);
	});

	it("should activate a patient", async () => {
		const patient = await createPatient.execute({
			name: "Juan Pérez",
			phone: "+56911111111",
			actorId: "user-1",
		});

		await useCase.execute({
			id: patient.id.value,
			active: false,
			actorId: "user-1",
		});

		const result = await useCase.execute({
			id: patient.id.value,
			active: true,
			actorId: "user-1",
		});

		expect(result.active).toBe(true);
	});

	it("should throw when patient does not exist", async () => {
		await expect(
			useCase.execute({
				id: "missing-patient",
				active: false,
				actorId: "user-1",
			}),
		).rejects.toBeInstanceOf(PatientNotFoundError);
	});

	it("should create an audit log", async () => {
		const patient = await createPatient.execute({
			name: "Juan Pérez",
			phone: "+56911111111",
			actorId: "user-1",
		});

		auditLogRepository.items = [];

		await useCase.execute({
			id: patient.id.value,
			active: false,
			actorId: "user-2",
		});

		expect(auditLogRepository.items).toHaveLength(1);

		expect(auditLogRepository.items[0]).toMatchObject({
			entityType: "patient",
			entityId: patient.id.value,
			action: "update",
			userId: "user-2",
			before: {
				active: true,
			},
			after: {
				active: false,
			},
		});
	});
});
