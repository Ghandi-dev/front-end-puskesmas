"use client";

import useChangeUrl from "@/hooks/useChangeUrl";
import roomServices from "@/service/room.service";
import { Room, roomSchema, RoomSelected } from "@/types/Room";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useRoom = () => {
	const queryClient = useQueryClient();
	const [selectedRoom, setSelectedRoom] = useState<RoomSelected>({} as RoomSelected);
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

	const formEdit = useForm({
		mode: "onChange",
		resolver: yupResolver(roomSchema),
		defaultValues: {
			name: selectedRoom?.name,
		},
	});

	const updateRoom = async ({ id, data }: { id: string; data: Room }) => {
		const res = await roomServices.update(id, data);
		return res.data;
	};

	const { mutate: mutateUpdateRoom, isPending: isPendingUpdateRoom } = useMutation({
		mutationFn: updateRoom,
		onSuccess: () => {
			refetchRooms();
			queryClient.invalidateQueries({ queryKey: ["rooms"], exact: false });
			toast.success("Berhasil memperbarui ruangan");
		},
		onError: (error) => {
			toast.error(`Gagal memperbarui ruangan: ${error instanceof Error ? error.message : "Unknown error"}`);
		},
	});

	const handleUpdateRoom = (data: Room) => {
		if (!selectedRoom) return;
		mutateUpdateRoom({ id: selectedRoom._id, data });
	};

	const handleDeleteRoom = () => {
		if (!selectedRoom) return;
		mutateDeleteRoom(selectedRoom._id);
	};

	const handleCreateRoom = (data: Room) => {
		mutateCreateRoom(data);
	};
	return {
		form,
		formEdit,

		handleUpdateRoom,
		isPendingUpdateRoom,

		dataRooms,
		isLoadingRooms,
		selectedRoom,
		setSelectedRoom,

		isPendingCreateRoom,
		mutateCreateRoom,

		handleCreateRoom,
		handleDeleteRoom,
	};
};

export default useRoom;
