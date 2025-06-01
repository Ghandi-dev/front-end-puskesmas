import inventarisService from "@/service/invetaris.service";
import roomServices from "@/service/room.service";
import { InventoryVehicle } from "@/types/Inventory";
import { Room } from "@/types/Room";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useQRScanner = () => {
	const [id, setId] = useState<string | null>(null);

	const {
		data: inventoryData,
		isLoading: isLoadingInventory,
		isError: isInventoryError,
	} = useQuery({
		queryKey: ["inventory_scanner", id],
		queryFn: async () => {
			if (!id) return null;
			const res = await inventarisService.getById(id);
			return res.data.data as InventoryVehicle;
		},
		enabled: !!id,
		staleTime: 60 * 1000, // Cache for 1 minute
	});

	const {
		data: roomData,
		isLoading: isLoadingRoom,
		isError: isRoomError,
	} = useQuery({
		queryKey: ["room_scanner", inventoryData?.room],
		queryFn: async () => {
			if (!inventoryData?.room) return null;
			const res = await roomServices.getById(inventoryData.room);
			return res.data.data as Room;
		},
		enabled: !!inventoryData?.room, // Only fetch if room ID exists
		staleTime: 60 * 1000,
	});

	return {
		inventoryData,
		isLoadingInventory,
		isInventoryError,
		setId,
		roomData,
		isLoadingRoom,
		isRoomError,
	};
};

export default useQRScanner;
