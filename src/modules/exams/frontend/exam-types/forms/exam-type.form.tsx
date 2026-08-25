import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TextAreaField, TextField } from "@/shared/ui/forms";
import {
	type ExamTypeFormInput,
	type ExamTypeFormValues,
	examTypeFormSchema,
} from "./exam-type.schema";

type ExamTypeFormProps = {
	defaultValues?: ExamTypeFormValues;
	errorMessage?: string;
	onSubmit(values: ExamTypeFormValues): Promise<void> | void;
	onCancel?(): void;
};

export function ExamTypeForm({
	defaultValues,
	errorMessage,
	onSubmit,
	onCancel,
}: ExamTypeFormProps) {
	const form = useForm<ExamTypeFormInput, unknown, ExamTypeFormValues>({
		resolver: zodResolver(examTypeFormSchema),
		defaultValues: defaultValues ?? {
			name: "",
			durationMinutes: 30,
			description: "",
			instructions: "",
		},
	});

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
			<TextField
				name="name"
				label="Nombre"
				register={form.register}
				error={form.formState.errors.name}
				placeholder="Campo visual"
			/>
			<TextField
				name="durationMinutes"
				type="number"
				min={1}
				label="Duración aproximada (minutos)"
				register={form.register}
				error={form.formState.errors.durationMinutes}
				placeholder="45"
			/>
			<TextAreaField
				name="description"
				label="Descripción"
				register={form.register}
				error={form.formState.errors.description}
				placeholder="Examen que funciona con blabla"
			/>
			<TextAreaField
				name="instructions"
				label="Indicaciones para el paciente"
				register={form.register}
				error={form.formState.errors.instructions}
				placeholder="Traer lentes si utiliza"
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
