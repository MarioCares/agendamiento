type EmptyTableStateProps = {
	message: string;
};

export function EmptyTableState({ message }: EmptyTableStateProps) {
	return (
		<div className="rounded-md border p-8 text-center text-sm text-muted-foreground">
			{message}
		</div>
	);
}
