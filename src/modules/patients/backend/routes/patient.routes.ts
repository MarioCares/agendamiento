import { Hono } from "hono";
import { z } from "zod";
import { requireAuth } from "@/modules/identity/backend/middleware/require-auth";
import { requireRole } from "@/modules/identity/backend/middleware/require-role";
import type { AppEnv } from "@/types/app-env";
import { patientComposition } from "../composition/patient.composition";
import { toPatientDto } from "../dto/patient.dto";

export const patientRoutes = new Hono<AppEnv>();

const createPatientSchema = z.object({
	name: z.string().trim().min(2),
	rut: z.string().trim().optional(),
	phone: z.string().trim().min(1),
	email: z.string().trim().email().optional(),
	birthDate: z.coerce.date().optional(),
	notes: z.string().optional(),
});
const updatePatientSchema = createPatientSchema;
const setPatientStatusSchema = z.object({
	active: z.boolean(),
});

patientRoutes.use("*", requireAuth);
patientRoutes.use("*", requireRole(["admin"]));

patientRoutes.get("/", async (c) => {
	const db = c.get("db");
	const includeInactive = c.req.query("includeInactive") === "true";
	const { listPatientsUseCase } = patientComposition(db);
	const patients = await listPatientsUseCase.execute({
		includeInactive,
	});

	return c.json({
		success: true,
		data: patients.map(toPatientDto),
	});
});

patientRoutes.get("/search", async (c) => {
	const db = c.get("db");
	const query = c.req.query("q") ?? "";
	const includeInactive = c.req.query("includeInactive") === "true";
	const { searchPatientsUseCase } = patientComposition(db);
	const patients = await searchPatientsUseCase.execute({
		query,
		includeInactive,
	});

	return c.json({
		success: true,
		data: patients.map(toPatientDto),
	});
});

patientRoutes.post("/", async (c) => {
	const body = await c.req.json();
	const parsed = createPatientSchema.safeParse(body);

	if (!parsed.success) {
		return c.json(
			{
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: "Invalid request",
					details: parsed.error.flatten(),
				},
			},
			400,
		);
	}

	const db = c.get("db");
	const user = c.get("user");

	if (!user) {
		throw new Error("Usuario autenticado no encontrado");
	}

	const { createPatientUseCase } = patientComposition(db);
	const patient = await createPatientUseCase.execute({
		...parsed.data,
		actorId: user.id,
	});

	return c.json(
		{
			success: true,
			data: toPatientDto(patient),
		},
		201,
	);
});

patientRoutes.put("/:id", async (c) => {
	const id = c.req.param("id");
	const body = await c.req.json();
	const parsed = updatePatientSchema.safeParse(body);

	if (!parsed.success) {
		return c.json(
			{
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: "Invalid request",
					details: parsed.error.flatten(),
				},
			},
			400,
		);
	}

	const db = c.get("db");
	const user = c.get("user");

	if (!user) {
		throw new Error("Usuario autenticado no encontrado");
	}

	const { updatePatientUseCase } = patientComposition(db);
	const patient = await updatePatientUseCase.execute({
		id,
		...parsed.data,
		actorId: user.id,
	});

	return c.json({
		success: true,
		data: toPatientDto(patient),
	});
});

patientRoutes.patch("/:id/status", async (c) => {
	const id = c.req.param("id");
	const body = await c.req.json();
	const parsed = setPatientStatusSchema.safeParse(body);

	if (!parsed.success) {
		return c.json(
			{
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: "Invalid request",
					details: parsed.error.flatten(),
				},
			},
			400,
		);
	}

	const db = c.get("db");
	const user = c.get("user");

	if (!user) {
		throw new Error("Usuario autenticado no encontrado");
	}

	const { setPatientActiveUseCase } = patientComposition(db);
	const patient = await setPatientActiveUseCase.execute({
		id,
		active: parsed.data.active,
		actorId: user.id,
	});

	return c.json({
		success: true,
		data: toPatientDto(patient),
	});
});
