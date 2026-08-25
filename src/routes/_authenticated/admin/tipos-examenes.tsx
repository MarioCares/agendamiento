import { createFileRoute } from "@tanstack/react-router";
import { ExamTypesPage } from "@/modules/exams/frontend/exam-types/exam-types-page";

export const Route = createFileRoute("/_authenticated/admin/tipos-examenes")({
	component: ExamTypesPage,
});
