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
	fullname?: string;
	isActive?: boolean;
	profilePicture?: string | FileList;
	role?: string;
	username?: string;
}

export type { Profile, UserExtended, SessionExtended, JWTExtended };

const validatePassword = yup
	.string()
	.required()
	.min(6, "Password must be at least 6 characters")
	.test("at-least-one-uppercase-letter", "Contains at least one uppercase letter", (value) => {
		if (!value) return false;
		const regex = /^(?=.*[A-Z])/;
		return regex.test(value);
	})
	.test("at-least-one-number", "Contains at least one number", (value) => {
		if (!value) return false;
		const regex = /^(?=.*\d)/;
		return regex.test(value);
	});

const validatePasswordConfirm = yup
	.string()
	.required()
	.oneOf([yup.ref("password"), ""], "Passwords must match");

export const loginSchema = yup.object().shape({
	identifier: yup.string().required("Email/Username harus diisi"),
	password: yup.string().required("Password harus diisi"),
});

export const registerSchema = yup.object().shape({
	username: yup.string().required("Username harus diisi"),
	fullname: yup.string().required("Nama harus diisi"),
	email: yup.string().required("Email harus diisi").email("Email tidak valid"),
	password: validatePassword,
	passwordConfirm: validatePasswordConfirm,
});

export const userSchema = yup.object().shape({
	username: yup.string().required("Username harus diisi"),
	fullname: yup.string().required("Nama harus diisi"),
	role: yup.string().required("Role harus diisi"),
	profilePicture: yup.string().required("Foto Profil harus diisi"),
	email: yup.string().required("Email harus diisi").email("Email tidak valid"),
});

type UserSchema = yup.InferType<typeof userSchema>;
export type UserSelected = Omit<UserSchema, "_id"> & {
	_id: string;
};
export type Login = yup.InferType<typeof loginSchema>;
export type Register = yup.InferType<typeof registerSchema>;
