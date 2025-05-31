import endpoint from "./endpoint.constants";
import { instance } from "@/lib/axios/instance";

const roomServices = {
	getAll: () => instance.get(`${endpoint.ROOM}s`),
	getById: (id: string) => instance.get(`${endpoint.ROOM}/${id}`),
	create: (payload: { name: string; code: string }) => instance.post(`${endpoint.ROOM}`, payload),
	update: (id: string, payload: { name?: string; code?: string }) => instance.put(`${endpoint.ROOM}/${id}`, payload),
	delete: (id: string) => instance.delete(`${endpoint.ROOM}/${id}`),
};

export default roomServices;
