import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { ExamTypeDto } from "@/modules/exams/backend/dto/output-exam-type.dto";

type ExamTypeStatusDialogProps = {
	examType: ExamTypeDto | null;
	open: boolean;
	isPending?: boolean;
	onOpenChange(open: boolean): void;
	onConfirm(): Promise<void> | void;
};

export function ExamTypeStatusDialog({
	examType,
	open,
	isPending,
	onOpenChange,
	onConfirm,
}: ExamTypeStatusDialogProps) {
	if (!examType) {
		return null;
	}

	const willActivate = !examType.active;

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						{willActivate
							? "Activar tipo de examen"
							: "Desactivar tipo de examen"}
					</AlertDialogTitle>

					<AlertDialogDescription>
						{willActivate
							? `¿Deseas activar "${examType.name}"? Volverá a estar disponible para nuevas solicitudes.`
							: `¿Deseas desactivar "${examType.name}"? Dejará de estar disponible para nuevas solicitudes.`}
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>

					<AlertDialogAction disabled={isPending} onClick={onConfirm}>
						{isPending
							? "Guardando..."
							: willActivate
								? "Activar"
								: "Desactivar"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
