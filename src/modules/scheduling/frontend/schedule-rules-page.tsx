import { useState } from "react";
import { FormDialog } from "@/shared/ui/dialogs/form-dialog";
import { StatusConfirmationDialog } from "@/shared/ui/dialogs/status-confirmation";
import { EntityPageToolbar } from "@/shared/ui/toolbars/entity-toolbar";
import {
	dayLabels,
	type ScheduleRuleDto,
} from "../backend/dto/schedule-rule.dto";
import { ScheduleRulesTable } from "./components/schedule-rules.table";
import { ScheduleRuleForm } from "./forms/schedule-rules.form";
import type { ScheduleRuleFormValues } from "./forms/schedule-rules.schema";
import { useCreateScheduleRule } from "./hooks/use-create-schedule-rule";
import { useScheduleRules } from "./hooks/use-schedule-rules";
import { useSetScheduleRuleActive } from "./hooks/use-set-schedule-rule-active";
import { useUpdateScheduleRule } from "./hooks/use-update-schedule-rule";

export function ScheduleRulePage() {
	const [createOpen, setCreateOpen] = useState(false);
	const [selectedScheduleRule, setSelectedScheduleRule] =
		useState<ScheduleRuleDto | null>(null);
	const [statusScheduleRule, setStatusScheduleRule] =
		useState<ScheduleRuleDto | null>(null);

	const scheduleRulesQuery = useScheduleRules();
	const createMutation = useCreateScheduleRule();
	const updateMutation = useUpdateScheduleRule();
	const statusMutation = useSetScheduleRuleActive();

	async function handleCreate(values: ScheduleRuleFormValues) {
		await createMutation.mutateAsync(values);
		setCreateOpen(false);
	}

	async function handleUpdate(values: ScheduleRuleFormValues) {
		if (!selectedScheduleRule) {
			return;
		}

		await updateMutation.mutateAsync({
			id: selectedScheduleRule.id,
			values,
		});

		setSelectedScheduleRule(null);
	}

	async function handleConfirmStatusChange() {
		if (!statusScheduleRule) {
			return;
		}

		await statusMutation.mutateAsync({
			id: statusScheduleRule.id,
			active: !statusScheduleRule.active,
		});

		setStatusScheduleRule(null);
	}

	if (scheduleRulesQuery.isLoading) {
		return <p>Cargando...</p>;
	}

	if (scheduleRulesQuery.isError) {
		return <p>No se pudieron cargar los horarios.</p>;
	}

	return (
		<main className="space-y-6 p-6">
			<EntityPageToolbar
				title="Horarios de atención"
				description="Configura los tramos normales para las atenciones."
				actionLabel="Nuevo horario"
				onAction={() => setCreateOpen(true)}
			/>
			<ScheduleRulesTable
				rules={scheduleRulesQuery.data ?? []}
				onEdit={setSelectedScheduleRule}
				onRequestStatusChange={setStatusScheduleRule}
			/>
			<FormDialog
				open={createOpen}
				title="Nuevo horario"
				description="Define un nuevo tramo de atención"
				onOpenChange={setCreateOpen}
			>
				<ScheduleRuleForm
					onSubmit={handleCreate}
					onCancel={() => setCreateOpen(false)}
					errorMessage={createMutation.error?.message}
				/>
			</FormDialog>
			<FormDialog
				open={selectedScheduleRule !== null}
				title="Editar horario"
				description="Modifica el tramo de atención seleccionado."
				onOpenChange={(open) => {
					if (!open) {
						setSelectedScheduleRule(null);
					}
				}}
			>
				{selectedScheduleRule ? (
					<ScheduleRuleForm
						key={selectedScheduleRule.id}
						onSubmit={handleUpdate}
						onCancel={() => setCreateOpen(false)}
						errorMessage={createMutation.error?.message}
						defaultValues={{
							dayOfWeek: selectedScheduleRule.dayOfWeek,
							startTime: selectedScheduleRule.startTime,
							endTime: selectedScheduleRule.endTime,
						}}
					/>
				) : null}
			</FormDialog>
			{statusScheduleRule ? (
				<StatusConfirmationDialog
					open={statusScheduleRule !== null}
					item={statusScheduleRule}
					isPending={statusMutation.isPending}
					entityName="Horario"
					getItemLabel={(scheduleRule) => scheduleRule.dayOfWeek}
					activateDescription={`Podrás agendar entre ${statusScheduleRule.startTime} y ${statusScheduleRule.endTime}`}
					deactivateDescription={`No podrá agendar entre ${statusScheduleRule.startTime} y ${statusScheduleRule.endTime}`}
					onOpenChange={(open) => {
						if (!open) {
							setStatusScheduleRule(null);
						}
					}}
					onConfirm={handleConfirmStatusChange}
				/>
			) : null}
		</main>
	);
}
