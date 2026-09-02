import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	type ScheduleRuleFormValues,
	scheduleRuleFormSchema,
} from "./schedule-rules.schema";

type ScheduleRuleFormProps = {
	defaultValues?: ScheduleRuleFormValues;
	errorMessage?: string;
	onSubmit(values: ScheduleRuleFormValues): Promise<void> | void;
	onCancel?(): void;
};

const dayOptions = [
	{ value: "monday", label: "Lunes" },
	{ value: "tuesday", label: "Martes" },
	{ value: "wednesday", label: "Miércoles" },
	{ value: "thursday", label: "Jueves" },
	{ value: "friday", label: "Viernes" },
	{ value: "saturday", label: "Sábado" },
	{ value: "sunday", label: "Domingo" },
] as const;

export function ScheduleRuleForm({
	defaultValues,
	errorMessage,
	onSubmit,
	onCancel,
}: ScheduleRuleFormProps) {
	const form = useForm<ScheduleRuleFormValues>({
		resolver: zodResolver(scheduleRuleFormSchema),
		defaultValues: defaultValues ?? {
			dayOfWeek: "monday",
			startTime: "09:00",
			endTime: "13:00",
		},
	});

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
			<div className="space-y-2">
				<Label>Día</Label>

				<Select
					value={form.watch("dayOfWeek")}
					onValueChange={(value) =>
						form.setValue(
							"dayOfWeek",
							value as ScheduleRuleFormValues["dayOfWeek"],
							{ shouldValidate: true },
						)
					}
				>
					<SelectTrigger>
						<SelectValue placeholder="Selecciona un día" />
					</SelectTrigger>

					<SelectContent>
						{dayOptions.map((day) => (
							<SelectItem key={day.value} value={day.value}>
								{day.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{form.formState.errors.dayOfWeek ? (
					<p className="text-sm text-destructive">
						{form.formState.errors.dayOfWeek.message}
					</p>
				) : null}
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="startTime">Hora de inicio</Label>

					<Input id="startTime" type="time" {...form.register("startTime")} />

					{form.formState.errors.startTime ? (
						<p className="text-sm text-destructive">
							{form.formState.errors.startTime.message}
						</p>
					) : null}
				</div>

				<div className="space-y-2">
					<Label htmlFor="endTime">Hora de término</Label>

					<Input id="endTime" type="time" {...form.register("endTime")} />

					{form.formState.errors.endTime ? (
						<p className="text-sm text-destructive">
							{form.formState.errors.endTime.message}
						</p>
					) : null}
				</div>
			</div>

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
