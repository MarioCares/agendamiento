import { Hono } from "hono";
import { z } from "zod";
import { requireAuth } from "@/modules/identity/backend/middleware/require-auth";
import { requireRole } from "@/modules/identity/backend/middleware/require-role";
import type { AppEnv } from "@/types/app-env";
import { scheduleRuleComposition } from "../composition/schedule-rule.composition";
import { toScheduleRuleDto } from "../dto/schedule-rule.dto";

export const scheduleRuleRoutes = new Hono<AppEnv>();

const dayOfWeekSchema = z.enum([
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday",
]);

const timeSchema = z
	.string()
	.regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Time must use HH:mm format");

const createScheduleRuleSchema = z.object({
	dayOfWeek: dayOfWeekSchema,
	startTime: timeSchema,
	endTime: timeSchema,
});

const updateScheduleRuleSchema = createScheduleRuleSchema;

const setScheduleRuleStatusSchema = z.object({
	active: z.boolean(),
});

scheduleRuleRoutes.use("*", requireAuth);
scheduleRuleRoutes.use("*", requireRole(["admin"]));

scheduleRuleRoutes.get("/", async (c) => {
	const db = c.get("db");

	const { listScheduleRulesUseCase } = scheduleRuleComposition(db);

	const rules = await listScheduleRulesUseCase.execute();

	return c.json({
		success: true,
		data: rules.map(toScheduleRuleDto),
	});
});

scheduleRuleRoutes.post("/", async (c) => {
	const body = await c.req.json();

	const parsed = createScheduleRuleSchema.safeParse(body);

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

	const { createScheduleRuleUseCase } = scheduleRuleComposition(db);

	const rule = await createScheduleRuleUseCase.execute({
		...parsed.data,
		actorId: user.id,
	});

	return c.json(
		{
			success: true,
			data: toScheduleRuleDto(rule),
		},
		201,
	);
});

scheduleRuleRoutes.put("/:id", async (c) => {
	const id = c.req.param("id");
	const body = await c.req.json();

	const parsed = updateScheduleRuleSchema.safeParse(body);

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

	const { updateScheduleRuleUseCase } = scheduleRuleComposition(db);

	const rule = await updateScheduleRuleUseCase.execute({
		id,
		...parsed.data,
		actorId: user.id,
	});

	return c.json({
		success: true,
		data: toScheduleRuleDto(rule),
	});
});

scheduleRuleRoutes.patch("/:id/status", async (c) => {
	const id = c.req.param("id");
	const body = await c.req.json();

	const parsed = setScheduleRuleStatusSchema.safeParse(body);

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

	const { setScheduleRuleActiveUseCase } = scheduleRuleComposition(db);

	const rule = await setScheduleRuleActiveUseCase.execute({
		id,
		active: parsed.data.active,
		actorId: user.id,
	});

	return c.json({
		success: true,
		data: toScheduleRuleDto(rule),
	});
});
