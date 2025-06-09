import { Login, Register, UpdatePassword } from "@/types/Auth";
import endpoint from "./endpoint.constants";
import { instance } from "@/lib/axios/instance";

const authServices = {
	// updatePhoto: (payload: UserPhoto) => instance.post(`${endpoint.AUTH}/update-profile`, payload),
	create: (payload: Register) => instance.post(`${endpoint.AUTH}/register`, payload),
	login: (payload: Login) => instance.post(`${endpoint.AUTH}/login`, payload),
	getProfileWithToken: (token: string) =>
		instance.get(`${endpoint.AUTH}/me`, {
			headers: { Authorization: `Bearer ${token}` },
		}),
	getProfile: () => instance.get(`${endpoint.AUTH}/me`),
	getAll: (params: string) => instance.get(`${endpoint.AUTH}/users?${params}`),
	updateRole: (id: string) => instance.put(`${endpoint.AUTH}/update-role/${id}`),
	updatePassword: (payload: UpdatePassword) => instance.post(`${endpoint.AUTH}/update-password`, payload),
};

export default authServices;
