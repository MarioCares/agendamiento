import { beforeEach, describe, expect, it } from "vitest";
import { CreatePatientUseCase } from "@/modules/patients/domain/application/use-cases/create-patient.use-case";
import { ListPatientsUseCase } from "@/modules/patients/domain/application/use-cases/list-patients.use-case";
import { SetPatientActiveUseCase } from "@/modules/patients/domain/application/use-cases/set-patient-active.use-case";
import { InMemoryAuditLogRepository } from "@/tests/shared/audit/in-memory-audit-log.repository";
import { InMemoryPatientRepository } from "../../repositories/in-memory-patients.repository";

describe("ListPatientsUseCase", () => {
	let patientRepository: InMemoryPatientRepository;
	let auditLogRepository: InMemoryAuditLogRepository;
	let createPatient: CreatePatientUseCase;
	let setPatientActive: SetPatientActiveUseCase;
	let useCase: ListPatientsUseCase;

	beforeEach(() => {
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

		useCase = new ListPatientsUseCase(patientRepository);
	});

	it("should list active patients", async () => {
		await createPatient.execute({
			name: "Juan Pérez",
			phone: "+56911111111",
			actorId: "user-1",
		});

		await createPatient.execute({
			name: "Pedro Soto",
			phone: "+56922222222",
			actorId: "user-1",
		});

		const result = await useCase.execute();

		expect(result).toHaveLength(2);
	});

	it("should hide inactive patients by default", async () => {
		const first = await createPatient.execute({
			name: "Juan Pérez",
			phone: "+56911111111",
			actorId: "user-1",
		});

		await createPatient.execute({
			name: "Pedro Soto",
			phone: "+56922222222",
			actorId: "user-1",
		});

		await setPatientActive.execute({
			id: first.id.value,
			active: false,
			actorId: "user-1",
		});

		const result = await useCase.execute();

		expect(result).toHaveLength(1);
		expect(result[0].name.value).toBe("Pedro Soto");
	});

	it("should include inactive patients when requested", async () => {
		const patient = await createPatient.execute({
			name: "Juan Pérez",
			phone: "+56911111111",
			actorId: "user-1",
		});

		await setPatientActive.execute({
			id: patient.id.value,
			active: false,
			actorId: "user-1",
		});

		const result = await useCase.execute({
			includeInactive: true,
		});

		expect(result).toHaveLength(1);
		expect(result[0].active).toBe(false);
	});
});
