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

type ActivatableItem = {
	active: boolean;
};

type StatusConfirmationDialogProps<T extends ActivatableItem> = {
	item: T | null;
	open: boolean;
	isPending?: boolean;
	entityName: string;
	getItemLabel(item: T): string;
	activateDescription: string;
	deactivateDescription: string;
	onOpenChange(open: boolean): void;
	onConfirm(): Promise<void> | void;
};

export function StatusConfirmationDialog<T extends ActivatableItem>({
	item,
	open,
	isPending,
	entityName,
	getItemLabel,
	activateDescription,
	deactivateDescription,
	onOpenChange,
	onConfirm,
}: StatusConfirmationDialogProps<T>) {
	if (!item) {
		return null;
	}

	const willActivate = !item.active;
	const itemLabel = getItemLabel(item);

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						{willActivate
							? `Activar ${entityName}`
							: `Desactivar ${entityName}`}
					</AlertDialogTitle>

					<AlertDialogDescription>
						{willActivate
							? `¿Deseas activar "${itemLabel}"? ${activateDescription}`
							: `¿Deseas desactivar "${itemLabel}"? ${deactivateDescription}`}
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
