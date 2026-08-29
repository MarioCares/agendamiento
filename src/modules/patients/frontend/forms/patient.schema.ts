import { z } from "zod";

export const patientFormSchema = z.object({
	name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
	rut: z.string().trim().optional().or(z.literal("")),
	phone: z.string().trim().min(1, "El teléfono es obligatorio"),
	email: z
		.email("El correo electrónico no es válido")
		.trim()
		.optional()
		.or(z.literal("")),
	birthDate: z.string().optional().or(z.literal("")),
	notes: z.string().trim().optional().or(z.literal("")),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;
export type PatientFormInput = z.input<typeof patientFormSchema>;
