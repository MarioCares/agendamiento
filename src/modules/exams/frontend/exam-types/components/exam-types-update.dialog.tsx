import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { ExamTypeDto } from "@/modules/exams/backend/dto/output-exam-type.dto";
import { ExamTypeForm } from "../forms/exam-type.form";
import type { ExamTypeFormValues } from "../forms/exam-type.schema";

type EditExamTypeDialogProps = {
	open: boolean;
	examType: ExamTypeDto | null;
	errorMessage?: string;
	onOpenChange(open: boolean): void;
	onSubmit(values: ExamTypeFormValues): Promise<void> | void;
};

export function EditExamTypeDialog({
	open,
	examType,
	errorMessage,
	onOpenChange,
	onSubmit,
}: EditExamTypeDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Editar tipo de examen</DialogTitle>
					<DialogDescription>
						Modifica los datos del examen seleccionado.
					</DialogDescription>
				</DialogHeader>

				{examType ? (
					<ExamTypeForm
						key={examType.id}
						errorMessage={errorMessage}
						defaultValues={{
							name: examType.name,
							durationMinutes: examType.durationMinutes,
							description: examType.description,
							instructions: examType.instructions,
						}}
						onSubmit={onSubmit}
						onCancel={() => onOpenChange(false)}
					/>
				) : null}
			</DialogContent>
		</Dialog>
	);
}
