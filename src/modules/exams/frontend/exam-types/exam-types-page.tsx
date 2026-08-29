import { useState } from "react";
import { FormDialog } from "@/shared/ui/dialogs/form-dialog";
import { StatusConfirmationDialog } from "@/shared/ui/dialogs/status-confirmation";
import { EntityPageToolbar } from "@/shared/ui/toolbars/entity-toolbar";
import type { ExamTypeDto } from "../../backend/dto/output-exam-type.dto";
import { ExamTypesTable } from "./components/exam-types.table";
import { ExamTypeForm } from "./forms/exam-type.form";
import type { ExamTypeFormValues } from "./forms/exam-type.schema";
import { useCreateExamType } from "./hooks/useCreateExamType";
import { useExamTypes } from "./hooks/useExamTypes";
import { useSetExamTypeActive } from "./hooks/useSetExamTypeActive";
import { useUpdateExamType } from "./hooks/useUpdateExamType";

export function ExamTypesPage() {
	const [createOpen, setCreateOpen] = useState(false);
	const [selectedExamType, setSelectedExamType] = useState<ExamTypeDto | null>(
		null,
	);
	const [statusExamType, setStatusExamType] = useState<ExamTypeDto | null>(
		null,
	);

	const examTypesQuery = useExamTypes();
	const createMutation = useCreateExamType();
	const updateMutation = useUpdateExamType();
	const statusMutation = useSetExamTypeActive();

	async function handleCreate(values: ExamTypeFormValues) {
		await createMutation.mutateAsync(values);
		setCreateOpen(false);
	}

	async function handleUpdate(values: ExamTypeFormValues) {
		if (!selectedExamType) {
			return;
		}

		await updateMutation.mutateAsync({
			id: selectedExamType.id,
			values,
		});

		setSelectedExamType(null);
	}

	async function handleConfirmStatusChange() {
		if (!statusExamType) {
			return;
		}

		await statusMutation.mutateAsync({
			id: statusExamType.id,
			active: !statusExamType.active,
		});

		setStatusExamType(null);
	}

	if (examTypesQuery.isLoading) {
		return <p>Cargando...</p>;
	}

	if (examTypesQuery.isError) {
		return <p>No se pudieron cargar los tipos de examen.</p>;
	}

	return (
		<main className="space-y-6 p-6">
			<EntityPageToolbar
				title="Tipos de examen"
				description="Administra los exámenes disponibles en la consulta."
				actionLabel="Agregar tipo de examen"
				onAction={() => setCreateOpen(true)}
			/>
			<ExamTypesTable
				examTypes={examTypesQuery.data ?? []}
				onEdit={setSelectedExamType}
				onRequestStatusChange={setStatusExamType}
			/>
			<FormDialog
				open={createOpen}
				title="Nuevo tipo de examen"
				description="Ingresa los datos del examen."
				onOpenChange={setCreateOpen}
			>
				<ExamTypeForm
					errorMessage={createMutation.error?.message}
					onSubmit={handleCreate}
					onCancel={() => setCreateOpen(false)}
				/>
			</FormDialog>
			<FormDialog
				open={selectedExamType !== null}
				title="Editar tipo de examen"
				description="Modifica los datos del examen seleccionado."
				onOpenChange={(open) => {
					if (!open) {
						setSelectedExamType(null);
					}
				}}
			>
				{selectedExamType ? (
					<ExamTypeForm
						key={selectedExamType.id}
						errorMessage={updateMutation.error?.message}
						defaultValues={{
							name: selectedExamType.name,
							durationMinutes: selectedExamType.durationMinutes,
							description: selectedExamType.description,
							instructions: selectedExamType.instructions,
						}}
						onSubmit={handleUpdate}
						onCancel={() => setSelectedExamType(null)}
					/>
				) : null}
			</FormDialog>
			<StatusConfirmationDialog
				open={statusExamType !== null}
				item={statusExamType}
				isPending={statusMutation.isPending}
				entityName="tipo de examen"
				getItemLabel={(examType) => examType.name}
				activateDescription="Volverá a estar disponible para nuevas solicitudes."
				deactivateDescription="Dejará de estar disponible para nuevas solicitudes."
				onOpenChange={(open) => {
					if (!open) {
						setStatusExamType(null);
					}
				}}
				onConfirm={handleConfirmStatusChange}
			/>
		</main>
	);
}
