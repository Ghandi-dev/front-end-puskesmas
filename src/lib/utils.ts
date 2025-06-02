import { CONDITION } from "@/constant/list.constants";
import { TYPE, TYPE_MAP, TYPE_REVERSE_MAP } from "@/types/Inventory";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Map dari label frontend ke key backend
const CONDITION_MAP: Record<CONDITION, string> = {
	[CONDITION.GOOD]: "good",
	[CONDITION.FAIR]: "fair",
	[CONDITION.DAMAGED]: "damaged",
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

// Map dari key backend ke label frontend (kebalikan dari CONDITION_MAP)
const BACKEND_CONDITION_MAP: Record<string, CONDITION> = {
	good: CONDITION.GOOD,
	fair: CONDITION.FAIR,
	damaged: CONDITION.DAMAGED,
};

/**
 * Translate condition(s) from backend key to enum label (frontend).
 * @param conditions - Single or array of string from backend (e.g., "good")
 * @returns CONDITION enum label(s) ("Baik", "Cukup", dll)
 */
export function translateConditionFromBackend(conditions: string | string[]): CONDITION | CONDITION[] {
	if (Array.isArray(conditions)) {
		return conditions.map((c) => BACKEND_CONDITION_MAP[c]);
	}
	return BACKEND_CONDITION_MAP[conditions];
}

/**
 * Translate type(s) from enum label to backend key.
 * @param types - Single or array of TYPE enum values (e.g., "Alat Kesehatan")
 * @returns string or array of string ("medic", "non_medic", etc.)
 */
export function translateTypeToBackend(types: TYPE | TYPE[]): string | string[] {
	if (Array.isArray(types)) {
		return types.map((t) => TYPE_MAP[t]);
	}
	return TYPE_MAP[types];
}

/**
 * Translate type(s) from backend key to frontend enum label.
 * @param types - Single or array of string from backend ("medic", "non_medic", etc.)
 * @returns TYPE or array of TYPE enum values ("Alat Kesehatan", etc.)
 */
export function translateTypeFromBackend(types: string | string[]): TYPE | TYPE[] {
	if (Array.isArray(types)) {
		return types.map((t) => TYPE_REVERSE_MAP[t]);
	}
	return TYPE_REVERSE_MAP[types];
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
