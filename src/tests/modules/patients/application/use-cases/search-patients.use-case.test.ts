import { beforeEach, describe, expect, it } from "vitest";
import { CreatePatientUseCase } from "@/modules/patients/domain/application/use-cases/create-patient.use-case";
import { SearchPatientsUseCase } from "@/modules/patients/domain/application/use-cases/search-patients.use-case";
import { SetPatientActiveUseCase } from "@/modules/patients/domain/application/use-cases/set-patient-active.use-case";
import { InMemoryAuditLogRepository } from "@/tests/shared/audit/in-memory-audit-log.repository";
import { InMemoryPatientRepository } from "../../repositories/in-memory-patients.repository";

describe("SearchPatientsUseCase", () => {
	let patientRepository: InMemoryPatientRepository;
	let auditLogRepository: InMemoryAuditLogRepository;
	let createPatient: CreatePatientUseCase;
	let setPatientActive: SetPatientActiveUseCase;
	let useCase: SearchPatientsUseCase;

	beforeEach(async () => {
		patientRepository = new InMemoryPatientRepository();
		auditLogRepository = new InMemoryAuditLogRepository();

		createPatient = new CreatePatientUseCase(
			patientRepository,
			auditLogRepository,
		);

		setPatientActive = new SetPatientActiveUseCase(
			patientRepository,
			auditLogRepository,
		);

		useCase = new SearchPatientsUseCase(patientRepository);

		await createPatient.execute({
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
	});

	it("should search patients by name", async () => {
		const result = await useCase.execute({
			query: "juan",
		});

		expect(result).toHaveLength(1);
		expect(result[0].name.value).toBe("Juan Pérez");
	});

	it("should search patients by rut", async () => {
		const result = await useCase.execute({
			query: "12345678",
		});

		expect(result).toHaveLength(1);
		expect(result[0].name.value).toBe("Juan Pérez");
	});

	it("should search patients by phone", async () => {
		const result = await useCase.execute({
			query: "22222222",
		});

		expect(result).toHaveLength(1);
		expect(result[0].name.value).toBe("María Soto");
	});

	it("should return an empty array for empty query", async () => {
		const result = await useCase.execute({
			query: "   ",
		});

		expect(result).toEqual([]);
	});

	it("should hide inactive patients by default", async () => {
		const patient = patientRepository.items[0];

		await setPatientActive.execute({
			id: patient.id.value,
			active: false,
			actorId: "user-1",
		});

		const result = await useCase.execute({
			query: "juan",
		});

		expect(result).toHaveLength(0);
	});

	it("should include inactive patients when requested", async () => {
		const patient = patientRepository.items[0];

		await setPatientActive.execute({
			id: patient.id.value,
			active: false,
			actorId: "user-1",
		});

		const result = await useCase.execute({
			query: "juan",
			includeInactive: true,
		});

		expect(result).toHaveLength(1);
		expect(result[0].active).toBe(false);
	});
});
