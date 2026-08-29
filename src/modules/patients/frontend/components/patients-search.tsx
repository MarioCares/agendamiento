import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PatientSearchProps = {
	value: string;
	onChange(value: string): void;
	placeholder?: string;
};

export function PatientSearch({
	value,
	onChange,
	placeholder = "Buscar por nombre, RUT o teléfono...",
}: PatientSearchProps) {
	return (
		<div className="relative w-full max-w-md">
			<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

			<Input
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				className="pl-9 pr-9"
			/>

			{value ? (
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="absolute right-1 top-1/2 size-7 -translate-y-1/2"
					onClick={() => onChange("")}
				>
					<X className="size-4" />
					<span className="sr-only">Limpiar búsqueda</span>
				</Button>
			) : null}
		</div>
	);
}
