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
	.required("Harus diisi")
	.min(6, "Password minimal 6 karakter")
	.test("at-least-one-uppercase-letter", "Minimal memiliki 1 huruf besar", (value) => {
		if (!value) return false;
		const regex = /^(?=.*[A-Z])/;
		return regex.test(value);
	})
	.test("at-least-one-number", "Minimal memiliki 1 angka", (value) => {
		if (!value) return false;
		const regex = /^(?=.*\d)/;
		return regex.test(value);
	});

const validatePasswordConfirm = yup
	.string()
	.required("Harus diisi")
	.oneOf([yup.ref("password"), ""], "Password tidak cocok");

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

export const updatePasswordSchema = yup.object().shape({
	oldPassword: validatePassword,
	password: validatePassword,
	confirmPassword: validatePasswordConfirm,
});

type UserSchema = yup.InferType<typeof userSchema>;
export type UserSelected = Omit<UserSchema, "_id"> & {
	_id: string;
};
export type Login = yup.InferType<typeof loginSchema>;
export type Register = yup.InferType<typeof registerSchema>;
export type UpdatePassword = yup.InferType<typeof updatePasswordSchema>;
