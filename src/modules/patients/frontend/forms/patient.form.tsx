import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TextAreaField, TextField } from "@/shared/ui/forms";
import {
	type PatientFormInput,
	type PatientFormValues,
	patientFormSchema,
} from "./patient.schema";

type PatientFormProps = {
	defaultValues?: PatientFormValues;
	errorMessage?: string;
	onSubmit(values: PatientFormValues): Promise<void> | void;
	onCancel?(): void;
};

export function PatientForm({
	defaultValues,
	errorMessage,
	onSubmit,
	onCancel,
}: PatientFormProps) {
	const form = useForm<PatientFormInput, unknown, PatientFormValues>({
		resolver: zodResolver(patientFormSchema),
		defaultValues: defaultValues ?? {
			name: "",
			birthDate: "",
			email: "",
			notes: "",
			phone: "",
			rut: "",
		},
	});

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
			<TextField
				name="rut"
				label="Rut"
				register={form.register}
				error={form.formState.errors.rut}
				placeholder="12345678-9"
			/>
			<TextField
				name="name"
				label="Nombre"
				register={form.register}
				error={form.formState.errors.name}
				placeholder="Pedro Pablo Pérez Pereira"
			/>
			<TextField
				name="phone"
				label="Teléfono"
				register={form.register}
				error={form.formState.errors.phone}
				placeholder="+56912345678"
			/>
			<TextField
				name="email"
				label="e-Mail"
				register={form.register}
				error={form.formState.errors.email}
				placeholder="paciente@correo.com"
			/>
			<TextField
				name="birthDate"
				label="Fecha de nacimiento"
				register={form.register}
				error={form.formState.errors.birthDate}
				type="date"
			/>
			<TextAreaField
				name="notes"
				label="Comentarios"
				register={form.register}
				error={form.formState.errors.notes}
			/>

			{errorMessage ? (
				<p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
					{errorMessage}
				</p>
			) : null}

			<div className="flex justify-end gap-2">
				{onCancel ? (
					<Button type="button" variant="outline" onClick={onCancel}>
						Cancelar
					</Button>
				) : null}

				<Button type="submit" disabled={form.formState.isSubmitting}>
					Guardar
				</Button>
			</div>
		</form>
	);
}
