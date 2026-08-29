import type { ReactNode } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

type FormDialogProps = {
	open: boolean;
	title: string;
	description?: string;
	children: ReactNode;
	onOpenChange(open: boolean): void;
};

export function FormDialog({
	open,
	title,
	description,
	children,
	onOpenChange,
}: FormDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>

					{description ? (
						<DialogDescription>{description}</DialogDescription>
					) : null}
				</DialogHeader>

				{children}
			</DialogContent>
		</Dialog>
	);
}
