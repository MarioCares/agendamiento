import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: () => (
		<div className="flex min-h-screen items-center justify-center">
			<h1 className="text-3xl font-bold">Sistema Himnario MonteSanto</h1>
		</div>
	),
});
