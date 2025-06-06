import { Room } from "@/types/Room";
import endpoint from "./endpoint.constants";
import { instance } from "@/lib/axios/instance";

const roomServices = {
	getAll: (params?: string) => instance.get(`${endpoint.ROOM}?${params}`),
	getById: (id: string) => instance.get(`${endpoint.ROOM}/${id}`),
	create: (payload: Room) => instance.post(`${endpoint.ROOM}`, payload),
	update: (id: string, payload: Room) => instance.put(`${endpoint.ROOM}/${id}`, payload),
	delete: (id: string) => instance.delete(`${endpoint.ROOM}/${id}`),
};

export default roomServices;
