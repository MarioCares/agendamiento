import { Button } from "@/components/ui/button";

type EntityRowActionsProps<T> = {
	item: T;
	isActive: boolean;
	onEdit(item: T): void;
	onRequestStatusChange(item: T): void;
};

export function EntityRowActions<T>({
	item,
	isActive,
	onEdit,
	onRequestStatusChange,
}: EntityRowActionsProps<T>) {
	return (
		<div className="flex justify-end gap-2">
			<Button variant="outline" size="sm" onClick={() => onEdit(item)}>
				Editar
			</Button>

			<Button
				variant={isActive ? "destructive" : "default"}
				size="sm"
				onClick={() => onRequestStatusChange(item)}
			>
				{isActive ? "Desactivar" : "Activar"}
			</Button>
		</div>
	);
}
