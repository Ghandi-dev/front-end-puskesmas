"use client";
import authServices from "@/service/auth.service";
import { UpdatePassword, updatePasswordSchema } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useChangePassword = () => {
	const updatePassword = async (payload: UpdatePassword) => {
		const { data } = await authServices.updatePassword(payload);
		return data.data;
	};

	const form = useForm({
		mode: "onChange",
		resolver: yupResolver(updatePasswordSchema),
		defaultValues: {
			oldPassword: "",
			password: "",
			passwordConfirm: "",
		},
	});

	const {
		mutate: mutateUpdatePassword,
		isPending: isPendingUpdatePassword,
		isSuccess: isSuccessUpdatePassword,
	} = useMutation({
		mutationFn: updatePassword,
		onSuccess: () => {
			form.reset();
			toast.success("Data berhasil disimpan");
			signOut({ callbackUrl: "/auth/login" });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleUpdatePassword = () => {
		const payload = form.getValues();
		mutateUpdatePassword(payload);
	};

	return {
		form,
		mutateUpdatePassword,
		isPendingUpdatePassword,
		isSuccessUpdatePassword,
		handleUpdatePassword,
	};
};

export default useChangePassword;
