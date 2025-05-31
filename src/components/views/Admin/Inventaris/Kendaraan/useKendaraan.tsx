"use client";
import { CONDITION } from "@/constant/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import useMediaHandling from "@/hooks/useMediaHandling";
import { translateConditionToBackend } from "@/lib/utils";
import inventarisService from "@/service/invetaris.service";
import roomServices from "@/service/room.service";
import { InventorySelected } from "@/types/Inventory";
import { RoomSelected } from "@/types/Room";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const useKendaraan = () => {
	const { handleDeleteFile } = useMediaHandling();

	const [selectedInventory, setSelectedInventory] = useState<InventorySelected>({} as InventorySelected);
	const { currentLimit, currentPage, currentSearch, condition, room, year, setCondition, setRoom, setYear } = useChangeUrl();

	const getInventories = async () => {
		let params = `limit=${currentLimit}&page=${currentPage}&type=vehicle`;
		if (currentSearch) {
			params += `&search=${currentSearch}`;
		}
		if (condition) {
			params += `&condition=${translateConditionToBackend(condition as CONDITION[])}`;
		}
		if (room) {
			params += `&room=${room}`;
		}
		// if (year.start) {
		// 	params += `&startYear=${year.start}`;
		// }
		// if (year.end) {
		// 	params += `&endYear=${year.end}`;
		// }
		const res = await inventarisService.getAll(params);
		return res.data;
	};

	const {
		data: dataInventories,
		isLoading: isLoadingInventories,
		refetch: refetchInventories,
	} = useQuery({
		queryKey: ["Inventories_vehicle", currentLimit, currentPage, currentSearch, condition, room, year],
		queryFn: getInventories,
		enabled: !!currentLimit && !!currentPage,
	});

	const deleteInventory = async (id: string) => {
		const res = await inventarisService.delete(id);
		return res.data;
	};

	const handleDeleteImage = () => {
		if (selectedInventory.image) {
			handleDeleteFile(selectedInventory.image, () => setSelectedInventory({} as InventorySelected));
		}
	};

	const { mutate: deleteInventoryMutate } = useMutation({
		mutationFn: deleteInventory,
		onSuccess: () => {
			toast.success("Berhasil menghapus inventaris");
			handleDeleteImage();
			refetchInventories();
		},
		onError: (error) => toast.error(`Gagal menghapus inventaris: ${error instanceof Error ? error.message : "Unknown error"}`),
	});

	const handleDeleteInventory = () => {
		if (!selectedInventory) return;
		deleteInventoryMutate(selectedInventory._id);
	};

	// get Rooms for select options
	const getRooms = async () => {
		const res = await roomServices.getAll();
		return res.data.data as RoomSelected[];
	};

	const { data: dataRooms, isLoading: isLoadingRooms } = useQuery({
		queryKey: ["rooms"],
		queryFn: getRooms,
		enabled: true,
	});

	return {
		dataInventories,
		refetchInventories,
		isLoadingInventories,
		handleDeleteInventory,

		setSelectedInventory,

		condition,
		room,
		year,
		setCondition,
		setRoom,
		setYear,

		dataRooms,
		isLoadingRooms,
	};
};

export default useKendaraan;
