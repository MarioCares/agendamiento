import { Button } from "@/components/ui/button";

type ExamTypesToolbarProps = {
	onImport(): void;
};
export function ExamTypesToolbar({ onImport }: ExamTypesToolbarProps) {
	return (
		<header className="flex items-end justify-between gap-4">
			<div>
				<h1 className="text-2xl font-bold">Tipos de examen</h1>
				<p className="text-muted-foreground">
					Administra los exámenes disponibles en la consulta.
				</p>
			</div>
			<Button onClick={onImport}>Importar</Button>
		</header>
	);
}
