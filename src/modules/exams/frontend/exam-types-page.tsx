import { useState } from "react";
import { ExamTypesToolbar } from "./components/exam-types-toolbar";

export function ExamTypesPage() {
	const [createOpen, setCreateOpen] = useState(false);

	return (
		<main className="space-y-6 p-6">
			<ExamTypesToolbar onImport={() => setCreateOpen(true)} />
		</main>
	);
}
