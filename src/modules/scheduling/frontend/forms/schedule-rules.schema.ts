import { z } from "zod";

export const dayOfWeekSchema = z.enum([
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
	.regex(/^([01]\d|2[0-3]):[0-5]\d$/, "La hora debe tener formato HH:mm");

export const scheduleRuleFormSchema = z
	.object({
		dayOfWeek: dayOfWeekSchema,
		startTime: timeSchema,
		endTime: timeSchema,
	})
	.refine((values) => values.startTime < values.endTime, {
		message: "La hora de término debe ser posterior a la hora de inicio",
		path: ["endTime"],
	});

export type ScheduleRuleFormValues = z.infer<typeof scheduleRuleFormSchema>;
