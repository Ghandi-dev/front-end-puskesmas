"use client";

import inventarisService from "@/service/invetaris.service";
import { Inventory } from "@/types/Inventory";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const useCetakQR = () => {
	const id = useParams().id as string;
	const getInventoryById = async () => {
		const res = await inventarisService.getById(id);
		return res.data.data as Inventory;
	};

	const { data: inventoryData, isLoading: isLoadingInventory } = useQuery({
		queryKey: ["inventory_vehicle", id],
		queryFn: getInventoryById,
		enabled: !!id,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
	});
	return {
		inventoryData,
		isLoadingInventory,
	};
};

export default useCetakQR;
