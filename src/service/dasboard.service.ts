import endpoint from "./endpoint.constants";
import { instance } from "@/lib/axios/instance";

const dashboardServices = {
	getAll: () => instance.get(`${endpoint.DASHBOARD}`),
};

export default dashboardServices;
