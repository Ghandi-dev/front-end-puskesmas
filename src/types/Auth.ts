import * as yup from "yup";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface UserExtended extends User {
	accessToken?: string;
	role?: string;
}

interface SessionExtended extends Session {
	accessToken?: string;
}

interface JWTExtended extends JWT {
	user?: UserExtended;
}

interface Profile {
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
	identifier: yup.string().required("Email/Username harus diisi"),
	password: yup.string().required("Password harus diisi"),
});

export type Login = yup.InferType<typeof loginSchema>;
