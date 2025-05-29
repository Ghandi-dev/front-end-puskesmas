"use client";
import { Login, loginSchema } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useLogin = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [visiblePassword, setVisiblePassword] = useState(false);
	const callbackUrl: string = (searchParams.get("callbackUrl") as string) || "/";

	const handleVisiblePassword = () => setVisiblePassword(!visiblePassword);

	const form = useForm<Login>({ resolver: yupResolver(loginSchema), defaultValues: { identifier: "", password: "" } });

	const loginService = async (payload: Login) => {
		const result = await signIn("credentials", { ...payload, redirect: false, callbackUrl });
		if (result?.error && result.status === 401) throw new Error("Email atau password salah atau tidak terdaftar");
	};

	const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
		mutationFn: loginService,
		onSuccess: () => {
			form.reset();
			toast.success("Login berhasil");
			router.push(callbackUrl);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleLogin = async (payload: Login) => {
		mutateLogin(payload);
	};
	return {
		form,
		visiblePassword,
		handleVisiblePassword,
		handleLogin,
		isPendingLogin,
	};
};

export default useLogin;
