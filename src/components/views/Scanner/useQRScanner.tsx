import inventarisService from "@/service/invetaris.service";
import roomServices from "@/service/room.service";
import { InventoryVehicle } from "@/types/Inventory";
import { Room } from "@/types/Room";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useQRScanner = () => {
	const [id, setId] = useState<string | null>(null);

	const getInventoryById = async () => {
		if (!id) {
			throw new Error("ID is required to fetch inventory data");
		}
		const res = await inventarisService.getById(id);
		return res.data.data as InventoryVehicle;
	};

	const { data: inventoryData, isLoading: isLoadingInventory } = useQuery({
		queryKey: ["inventory_scanner", id],
		queryFn: getInventoryById,
		enabled: !!id,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
	});

	const getRoomById = async () => {
		if (!inventoryData?.room) {
			throw new Error("ID is required to fetch room data");
		}
		const res = await roomServices.getById(inventoryData.room);
		return res.data.data as Room;
	};

	const { data: roomData, isLoading: isLoadingRoom } = useQuery({
		queryKey: ["room_scanner", inventoryData?.room],
		queryFn: getRoomById,
		enabled: !!inventoryData?.room,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
	});

	return {
		inventoryData,
		isLoadingInventory,
		setId,

		roomData,
		isLoadingRoom,
	};
};

export default useQRScanner;
