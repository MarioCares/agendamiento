import { z } from "zod";

export const examTypeFormSchema = z.object({
	name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
	durationMinutes: z.coerce
		.number()
		.int("La duración debe ser un número entero")
		.positive("La duración debe ser mayor a 0"),
	description: z.string().optional(),
	instructions: z.string().optional(),
});

export type ExamTypeFormValues = z.infer<typeof examTypeFormSchema>;
export type ExamTypeFormInput = z.input<typeof examTypeFormSchema>;
