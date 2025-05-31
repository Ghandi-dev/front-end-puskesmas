"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

interface SelectYearProps {
	label?: string;
	value: number | undefined;
	onChange: (year: number) => void;
	id?: string;
	className?: string;
}

const SelectYear: React.FC<SelectYearProps> = ({ value, onChange, id = "select-year", className = "", label }) => {
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 30 }, (_, i) => {
		const year = (currentYear - i).toString();
		return { label: year, value: year };
	});

	return (
		<div className={`flex flex-col gap-1 ${className}`}>
			<Select value={value ? value.toString() : ""} onValueChange={(val) => onChange(Number(val))}>
				<SelectTrigger id={id} className="w-full">
					<SelectValue placeholder={label} />
				</SelectTrigger>
				<SelectContent className="border-primary">
					<SelectGroup>
						{years.map((year) => (
							<SelectItem key={year.value} value={year.value}>
								{year.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

export default SelectYear;
