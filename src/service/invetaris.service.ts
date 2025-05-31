import { Inventory } from "@/types/Inventory";
import endpoint from "./endpoint.constants";
import { instance } from "@/lib/axios/instance";

const inventarisService = {
	getAll: (params: string) => instance.get(`/inventories?${params}`),
	getById: (id: string) => instance.get(`${endpoint.INVENTORY}/${id}`),
	create: (payload: Inventory) => instance.post(`${endpoint.INVENTORY}`, payload),
	update: (id: string, payload: Inventory) => instance.put(`${endpoint.INVENTORY}/${id}`, payload),
	delete: (id: string) => instance.delete(`${endpoint.INVENTORY}/${id}`),
};

export default inventarisService;
