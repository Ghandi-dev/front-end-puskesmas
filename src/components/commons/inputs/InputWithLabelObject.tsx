"use client";

import { useFormContext, Path, FieldValues } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";

type Props<S extends FieldValues> = {
	fieldTitle: string;
	nameInSchema: Path<S>;
	className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputWithLabelObject<S extends FieldValues>({ fieldTitle, nameInSchema, className, ...props }: Props<S>) {
	const form = useFormContext<S>();

	return (
		<FormField
			control={form.control}
			name={nameInSchema}
			render={({ field }) => (
				<FormItem>
					<FormLabel htmlFor={nameInSchema}>{fieldTitle}</FormLabel>
					<FormControl>
						<Input
							id={nameInSchema}
							className={`w-full disabled:text-blue-500 dark:disabled:text-green-500 disabled:opacity-75 ${className ?? ""}`}
							{...props}
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
