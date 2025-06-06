import * as yup from "yup";

export const roomSchema = yup.object().shape({
	name: yup.string().required("Name is required"),
});

export type Room = yup.InferType<typeof roomSchema>;
export type RoomSelected = Omit<Room, "_id"> & {
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
