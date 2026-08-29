import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type EntityPageToolbarProps = {
	title: string;
	description: string;
	actionLabel?: string;
	onAction(): void;
	children?: ReactNode;
};

export function EntityPageToolbar({
	title,
	description,
	actionLabel = "Agregar",
	onAction,
	children,
}: EntityPageToolbarProps) {
	return (
		<header className="flex items-end justify-between gap-4">
			<div>
				<h1 className="text-2xl font-bold">{title}</h1>
				<p className="text-muted-foreground">{description}</p>
			</div>
			{children && children}

			<Button onClick={onAction}>{actionLabel}</Button>
		</header>
	);
}
