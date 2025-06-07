"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props<S> = {
	fieldTitle: string;
	nameInSchema: keyof S & string;
	placeholder?: string;
	searchable?: boolean;
	className?: string;
	onChange?: (value: string) => void;
};

export function SelectYearWithLabel<S>({ fieldTitle, nameInSchema, placeholder = "Pilih tahun", searchable = true, className, onChange }: Props<S>) {
	const form = useFormContext();

	const currentYear = new Date().getFullYear();
	const yearOptions = Array.from({ length: 30 }, (_, i) => {
		const year = (currentYear - i).toString();
		return { label: year, value: year };
	});

	return (
		<FormField
			control={form.control}
			name={nameInSchema}
			render={({ field }) => (
				<FormItem>
					<FormLabel htmlFor={nameInSchema}>{fieldTitle}</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant="outline"
									role="combobox"
									className={cn("w-full justify-between border-primary-foreground", !field.value && "text-muted-foreground", className)}
								>
									{yearOptions.find((opt) => opt.value === field.value.toString())?.label || placeholder}
									<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-full p-0">
							<Command>
								{searchable && <CommandInput placeholder={`Cari ${fieldTitle.toLowerCase()}...`} />}
								<CommandList>
									<CommandEmpty>Tidak ada tahun</CommandEmpty>
									<CommandGroup>
										{yearOptions.map((opt) => (
											<CommandItem
												value={opt.value}
												key={opt.value}
												onSelect={() => {
													field.onChange(opt.value);
													onChange?.(opt.value);
												}}
											>
												{opt.label}
												<Check className={cn("ml-auto h-4 w-4", opt.value === field.value.toString() ? "opacity-100" : "opacity-0")} />
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
