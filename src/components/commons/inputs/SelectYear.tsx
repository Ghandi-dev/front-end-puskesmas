"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

interface SelectYearProps {
	label?: string;
	value: number | undefined;
	onChange: (year: number) => void;
	startYear?: number;
	endYear?: number;
	id?: string;
	className?: string;
}

const SelectYear: React.FC<SelectYearProps> = ({
	value,
	onChange,
	startYear = 1970,
	endYear = new Date().getFullYear(),
	id = "select-year",
	className = "",
	label,
}) => {
	const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i);

	return (
		<div className={`flex flex-col gap-1 ${className}`}>
			<Select value={value ? value.toString() : ""} onValueChange={(val) => onChange(Number(val))}>
				<SelectTrigger id={id} className="w-full">
					<SelectValue placeholder={label} />
				</SelectTrigger>
				<SelectContent className="border-primary">
					<SelectGroup>
						{years.map((year) => (
							<SelectItem key={year} value={year.toString()}>
								{year}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

export default SelectYear;
