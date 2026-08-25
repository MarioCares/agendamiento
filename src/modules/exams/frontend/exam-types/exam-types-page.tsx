import { useState } from "react";
import type { ExamTypeDto } from "../../backend/dto/output-exam-type.dto";
import { ExamTypesTable } from "./components/exam-types.table";
import { CreateExamTypeDialog } from "./components/exam-types-create.dialog";
import { ExamTypeStatusDialog } from "./components/exam-types-status.dialog";
import { ExamTypesToolbar } from "./components/exam-types-toolbar";
import { EditExamTypeDialog } from "./components/exam-types-update.dialog";
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
			<ExamTypesToolbar onImport={() => setCreateOpen(true)} />
			<ExamTypesTable
				examTypes={examTypesQuery.data ?? []}
				onEdit={setSelectedExamType}
				onRequestStatusChange={setStatusExamType}
			/>
			<CreateExamTypeDialog
				onOpenChange={setCreateOpen}
				open={createOpen}
				onSubmit={handleCreate}
				errorMessage={createMutation.error?.message}
			/>
			<EditExamTypeDialog
				open={selectedExamType !== null}
				examType={selectedExamType}
				onOpenChange={(open) => {
					if (!open) {
						setSelectedExamType(null);
					}
				}}
				errorMessage={updateMutation.error?.message}
				onSubmit={handleUpdate}
			/>
			<ExamTypeStatusDialog
				open={statusExamType !== null}
				examType={statusExamType}
				isPending={statusMutation.isPending}
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
