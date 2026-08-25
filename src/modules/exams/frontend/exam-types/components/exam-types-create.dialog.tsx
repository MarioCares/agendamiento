import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ExamTypeForm } from "../forms/exam-type.form";
import type { ExamTypeFormValues } from "../forms/exam-type.schema";

type CreateExamTypeDialogProps = {
	open: boolean;
	errorMessage?: string;
	onOpenChange(open: boolean): void;
	onSubmit(values: ExamTypeFormValues): Promise<void> | void;
};

export function CreateExamTypeDialog({
	open,
	errorMessage,
	onOpenChange,
	onSubmit,
}: CreateExamTypeDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Nuevo tipo de examen</DialogTitle>
					<DialogDescription>Ingresa los datos del examen.</DialogDescription>
				</DialogHeader>

				<ExamTypeForm
					errorMessage={errorMessage}
					onSubmit={onSubmit}
					onCancel={() => onOpenChange(false)}
				/>
			</DialogContent>
		</Dialog>
	);
}
