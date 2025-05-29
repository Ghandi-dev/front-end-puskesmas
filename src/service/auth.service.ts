import { Login } from "@/types/Auth";
import endpoint from "./endpoint.constants";
import { instance } from "@/lib/axios/instance";

const authServices = {
	// updatePhoto: (payload: UserPhoto) => instance.post(`${endpoint.AUTH}/update-profile`, payload),
	login: (payload: Login) => instance.post(`${endpoint.AUTH}/login`, payload),
	getProfileWithToken: (token: string) =>
		instance.get(`${endpoint.AUTH}/me`, {
			headers: { Authorization: `Bearer ${token}` },
		}),
	getProfile: () => instance.get(`${endpoint.AUTH}/me`),
	// updatePassword: (payload: UpdatePasswordSchemaType) => instance.post(`${endpoint.AUTH}/update-password`, payload),
};

export default authServices;
