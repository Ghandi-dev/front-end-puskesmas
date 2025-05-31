import { CONDITION } from "@/constant/list.constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Map dari label frontend ke key backend
const CONDITION_MAP: Record<CONDITION, string> = {
	[CONDITION.GOOD]: "good",
	[CONDITION.FAIR]: "fair",
	[CONDITION.DAMAGED]: "damage",
};

/**
 * Translate condition(s) from enum label to backend key.
 * @param conditions - Single or array of CONDITION enum values (e.g., "Baik")
 * @returns string or array of string ("good", "fair", etc.)
 */
export function translateConditionToBackend(conditions: CONDITION | CONDITION[]): string | string[] {
	if (Array.isArray(conditions)) {
		return conditions.map((c) => CONDITION_MAP[c]);
	}
	return CONDITION_MAP[conditions];
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
