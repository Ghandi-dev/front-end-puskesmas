"use client";

import useChangeUrl from "@/hooks/useChangeUrl";
import authServices from "@/service/auth.service";
import { Profile, Register, registerSchema } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useUser = () => {
	const [selectedUser, setSelectedUser] = useState<Profile>({});
	const { currentLimit, currentPage, currentSearch } = useChangeUrl();

	const getUser = async () => {
		let params = `limit=${currentLimit}&page=${currentPage}`;
		if (currentSearch) {
			params += `&search=${currentSearch}`;
		}
		const res = await authServices.getAll(params);
		return res.data.data;
	};

	const {
		data: dataUsers,
		isLoading: isLoadingUsers,
		refetch: refetchUsers,
	} = useQuery({
		queryKey: ["user", currentLimit, currentPage, currentSearch],
		queryFn: getUser,
		enabled: true,
	});

	// #### Start Logic Create User ####
	const form = useForm<Register>({
		mode: "onChange",
		resolver: yupResolver(registerSchema),
		defaultValues: {
			username: "",
			fullname: "",
			email: "",
			password: "",
			passwordConfirm: "",
		},
	});
	const createUser = async (data: Register) => {
		const res = await authServices.create(data);
		return res.data.data;
	};

	const { mutate: mutateCreateUser, isPending: isPendingMutateCreateUser } = useMutation({
		mutationFn: (variables: { data: Register }) => createUser(variables.data),
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: () => {
			refetchUsers();
			toast.success("Berhasil menambahkan user");
		},
	});

	const handleCreateUser = (data: Register) => mutateCreateUser({ data });
	// ### End Logic Create User ###

	// #### Start Logic Update User ####
	const updateUser = async (id: string) => {
		const res = await authServices.updateRole(id);
		return res.data.data;
	};

	const { mutate: mutateUpdateUser, isPending: isPendingMutateUpdateUser } = useMutation({
		mutationFn: (variables: { id: string }) => updateUser(variables.id),
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: () => {
			refetchUsers();
			toast.success("Berhasil mengubah user");
		},
	});

	const handleUpdateUser = () => {
		if (!selectedUser._id) return;
		mutateUpdateUser({ id: selectedUser._id });
	};
	// ### End Logic Update User ###

	return {
		dataUsers,
		isLoadingUsers,

		selectedUser,
		setSelectedUser,

		form,
		handleCreateUser,
		isPendingMutateCreateUser,

		handleUpdateUser,
		isPendingMutateUpdateUser,
	};
};

export default useUser;
