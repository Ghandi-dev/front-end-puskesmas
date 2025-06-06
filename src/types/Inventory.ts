import * as yup from "yup";

export enum TYPE {
	MEDIC = "MEDIS",
	NON_MEDIC = "NON MEDIS",
	VEHICLE = "KENDARAAN",
}

export const TYPE_MAP: Record<TYPE, string> = {
	[TYPE.MEDIC]: "medic",
	[TYPE.NON_MEDIC]: "non_medic",
	[TYPE.VEHICLE]: "vehicle",
};

export const TYPE_REVERSE_MAP: Record<string, TYPE> = Object.entries(TYPE_MAP).reduce((acc, [key, value]) => {
	acc[value] = key as TYPE;
	return acc;
}, {} as Record<string, TYPE>);

export const vehicleDetailSchema = yup.object().shape({
	chassis_number: yup.string().required("Chassis number is required"),
	engine_number: yup.string().required("Engine number is required"),
	license_plate: yup.string().required("License plate is required"),
	bpkb_number: yup.string().required("BPKB number is required"),
});

export const inventorySchema = yup.object().shape({
	code: yup.string().required("Code is required").matches(/^\d+$/, "Code must contain only numbers").length(10, "Code must be exactly 10 digits long"),
	name: yup.string().required("Name is required"),
	brand: yup.string().required("Brand is required"),
	type: yup.string().oneOf(["medic", "non_medic", "vehicle"]).required("Type is required"),
	material: yup.string().required("Material is required"),
	year: yup.number().min(1900, "Year too early").max(new Date().getFullYear(), "Year cannot be in the future").required("Year is required"),
	quantity: yup.number().min(1, "Quantity must be at least 1").required("Quantity is required"),
	condition: yup.string().oneOf(["good", "fair", "damaged"]).required("Condition is required"),
	mutationRemarks: yup.string().optional(),
	room: yup.string().when("type", {
		is: "vehicle",
		then: () => yup.string().notRequired(),
		otherwise: () => yup.string().required("Room is required"),
	}),
	image: yup.string().required("Image is required"),

	vehicle_details: yup.mixed().when("type", {
		is: "vehicle",
		then: () => vehicleDetailSchema.required(),
		otherwise: () => yup.mixed().notRequired(),
	}),
});

export type Inventory = yup.InferType<typeof inventorySchema>;
export type InventorySelected = Omit<Inventory, "_id"> & {
	_id: string;
	createdBy: {
		_id: string;
		fullname: string;
	};
	updatedBy: {
		_id: string;
		fullname: string;
	};
	createdAt: Date;
	updatedAt: Date;
};
export type InventoryVehicle = Omit<Inventory, "_id"> & {
	vehicle_details: yup.InferType<typeof vehicleDetailSchema>;
};
