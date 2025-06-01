"use client";

import useChangeUrl from "@/hooks/useChangeUrl";
import roomServices from "@/service/room.service";
import { Room, roomSchema } from "@/types/Room";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useRoom = () => {
	const [selectedIdRoom, setSelectedIdRoom] = useState<string>("");
	const { currentLimit, currentPage, currentSearch } = useChangeUrl();

	const getRooms = async () => {
		let params = `limit=${currentLimit}&page=${currentPage}`;
		if (currentSearch) {
			params += `&search=${currentSearch}`;
		}
		const res = await roomServices.getAll(params);
		return res.data;
	};
	const {
		data: dataRooms,
		isLoading: isLoadingRooms,
		refetch: refetchRooms,
	} = useQuery({
		queryKey: ["rooms_list", currentLimit, currentPage, currentSearch],
		queryFn: getRooms,
		enabled: true,
	});

	const form = useForm({
		mode: "onChange",
		resolver: yupResolver(roomSchema),
		defaultValues: {
			name: "",
		},
	});

	const createRoom = async (data: Room) => {
		const res = await roomServices.create(data);
		return res.data;
	};

	const { mutate: mutateCreateRoom, isPending: isPendingCreateRoom } = useMutation({
		mutationFn: createRoom,
		onSuccess: () => {
			form.reset();
			refetchRooms();
			toast.success("Berhasil membuat ruangan");
		},
		onError: (error) => {
			toast.error(`Gagal membuat ruangan: ${error instanceof Error ? error.message : "Unknown error"}`);
		},
	});

	const deleteRoom = async (id: string) => {
		const res = await roomServices.delete(id);
		return res.data;
	};

	const { mutate: mutateDeleteRoom } = useMutation({
		mutationFn: deleteRoom,
		onSuccess: () => {
			refetchRooms();
			toast.success("Berhasil menghapus ruangan");
		},
		onError: (error) => {
			toast.error(`Gagal menghapus ruangan: ${error instanceof Error ? error.message : "Unknown error"}`);
		},
	});

	const handleDeleteRoom = () => {
		if (!selectedIdRoom) return;
		mutateDeleteRoom(selectedIdRoom);
	};

	const handleCreateRoom = (data: Room) => {
		mutateCreateRoom(data);
	};
	return {
		form,

		dataRooms,
		isLoadingRooms,
		setSelectedIdRoom,

		isPendingCreateRoom,
		mutateCreateRoom,

		handleCreateRoom,
		handleDeleteRoom,
	};
};

export default useRoom;
