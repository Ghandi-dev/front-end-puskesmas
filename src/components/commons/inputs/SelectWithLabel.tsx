"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";

type Option = {
	label: string;
	value: string;
};

type Props<S> = {
	fieldTitle: string;
	nameInSchema: keyof S & string;
	options: Option[];
	placeholder?: string;
	className?: string;
};

export function SelectWithLabel<S>({ fieldTitle, nameInSchema, options, placeholder = "Pilih opsi" }: Props<S>) {
	const form = useFormContext();

	return (
		<FormField
			control={form.control}
			name={nameInSchema}
			render={({ field }) => (
				<FormItem>
					<FormLabel htmlFor={nameInSchema}>{fieldTitle}</FormLabel>
					<FormControl>
						<Select
							value={field.value}
							onValueChange={(value) => {
								field.onChange(value);
							}}
						>
							<SelectTrigger id={nameInSchema} className="w-full">
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
							<SelectContent className="border-primary">
								<SelectGroup>
									<SelectLabel>{fieldTitle}</SelectLabel>
									{options.map((opt) => (
										<SelectItem key={opt.value} value={opt.value}>
											{opt.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
