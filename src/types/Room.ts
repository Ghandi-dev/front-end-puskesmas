import * as yup from "yup";

export const room = yup.object().shape({
	name: yup.string().required("Name is required"),
});

export type Room = yup.InferType<typeof room>;
export type RoomSelected = Omit<Room, "_id"> & {
	_id: string;
};
