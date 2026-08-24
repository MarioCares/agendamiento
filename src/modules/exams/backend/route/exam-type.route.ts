import { requireAuth } from "@/modules/identity/backend/middleware/require-auth";
import { requireRole } from "@/modules/identity/backend/middleware/require-role";
import { AppEnv } from "@/types/app-env";
import { Hono } from "hono";
import { z } from "zod";
import { examTypeComposition } from "../composition/exam-types.composition";
import { toDtoExamType } from "../dto/output-exam-type.dto";

export const examTypeRoutes = new Hono<AppEnv>();

const createExamTypeSchema = z.object({
	name: z.string().min(2),
	durationMinutes: z.number().int().positive(),
	description: z.string().optional(),
	instructions: z.string().optional(),
});

const updateExamTypeSchema = createExamTypeSchema;

const setExamTypeStatusSchema = z.object({
	active: z.boolean(),
});

examTypeRoutes.use("*", requireAuth);
examTypeRoutes.use("*", requireRole(["admin"]));

examTypeRoutes.get("/", async (c) => {
	const db = c.get("db");

	const { listExamTypesUseCase } = examTypeComposition(db);

	const examTypes = await listExamTypesUseCase.execute();

	return c.json({
		success: true,
		data: examTypes.map(toDtoExamType),
	});
});

examTypeRoutes.post("/", async (c) => {
	const body = await c.req.json();

	const parsed = createExamTypeSchema.safeParse(body);

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

	const { createExamTypeUseCase } = examTypeComposition(db);
	const examType = await createExamTypeUseCase.execute({
		...parsed.data,
		actorId: user.id,
	});

	return c.json(
		{
			success: true,
			data: toDtoExamType(examType),
		},
		201,
	);
});

examTypeRoutes.put("/:id", async (c) => {
	const id = c.req.param("id");
	const body = await c.req.json();

	const parsed = updateExamTypeSchema.safeParse(body);

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

	const { updateExamTypeUseCase } = examTypeComposition(db);

	const examType = await updateExamTypeUseCase.execute({
		id,
		...parsed.data,
		actorId: user.id,
	});

	return c.json({
		success: true,
		data: toDtoExamType(examType),
	});
});

examTypeRoutes.patch("/:id/status", async (c) => {
	const id = c.req.param("id");
	const body = await c.req.json();

	const parsed = setExamTypeStatusSchema.safeParse(body);

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

	const { setExamTypeActiveUseCase } = examTypeComposition(db);

	const examType = await setExamTypeActiveUseCase.execute({
		id,
		active: parsed.data.active,
		actorId: user.id,
	});

	return c.json({
		success: true,
		data: toDtoExamType(examType),
	});
});