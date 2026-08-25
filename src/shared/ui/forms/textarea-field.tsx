import type { ComponentPropsWithoutRef } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldError as FieldErrorMessage } from "./field-error";

type BaseTextAreaFieldProps = Omit<
	ComponentPropsWithoutRef<typeof Textarea>,
	"name"
> & {
	label?: string;
	error?: { message?: string };
};

type RegisteredTextAreaFieldProps<TFieldValues extends FieldValues> =
	BaseTextAreaFieldProps & {
		name: Path<TFieldValues>;
		register: UseFormRegister<TFieldValues>;
	};

type ControlledTextAreaFieldProps = BaseTextAreaFieldProps & {
	name: string;
	register?: never;
};

type TextAreaFieldProps<TFieldValues extends FieldValues> =
	| RegisteredTextAreaFieldProps<TFieldValues>
	| ControlledTextAreaFieldProps;

export function TextAreaField<TFieldValues extends FieldValues>({
	name,
	label,
	register,
	error,
	id,
	...props
}: TextAreaFieldProps<TFieldValues>) {
	const textareaId = id ?? name;

	return (
		<div className="space-y-2">
			{label ? <Label htmlFor={textareaId}>{label}</Label> : null}

			<Textarea
				id={textareaId}
				aria-invalid={Boolean(error)}
				{...(register ? register(name as Path<TFieldValues>) : {})}
				{...props}
			/>

			<FieldErrorMessage message={error?.message} />
		</div>
	);
}
