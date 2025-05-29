import * as yup from "yup";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface UserExtended extends User {
	accessToken?: string;
	role?: string;
}

export interface SessionExtended extends Session {
	accessToken?: string;
}

export interface JWTExtended extends JWT {
	user?: UserExtended;
}

export interface Profile {
	_id?: string;
	email?: string;
	fullName?: string;
	isActive?: boolean;
	profilePicture?: string | FileList;
	role?: string;
	username?: string;
}

export type { Profile, UserExtended, SessionExtended, JWTExtended };

export const loginSchema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email harus diisi"),
	password: yup.string().required("Password harus diisi"),
});

export type Login = yup.InferType<typeof loginSchema>;
