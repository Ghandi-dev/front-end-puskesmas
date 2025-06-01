"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { InventorySelected } from "@/types/Inventory";
import { RoomSelected } from "@/types/Room";
import JenisInventaris from "./JenisInventaris";

interface PropsType {
	inventories: InventorySelected[];
	isLoading: boolean;
	room: RoomSelected[] | undefined;
}

const CetakLaporan = ({ inventories, isLoading, room }: PropsType) => {
	if (!inventories || inventories.length === 0) {
		return (
			<div className="flex flex-col min-h-dvh bg-gray-100 p-4 m-0 print:bg-white">
				<div className="text-center text-gray-500">
					<p>Tidak ada data inventaris yang tersedia.</p>
				</div>
			</div>
		);
	}

	const grouped = inventories.reduce((acc, item) => {
		if (!acc[item.type]) acc[item.type] = [];
		acc[item.type].push(item);
		return acc;
	}, {} as Record<string, InventorySelected[]>);

	return (
		<div className="flex flex-col min-h-dvh bg-gray-100 p-4 m-0 print:bg-white">
			{isLoading ? (
				// Skeleton jika loading
				<div className="space-y-4">
					<Skeleton className="h-6 w-1/2 mx-auto" />
					<Skeleton className="h-4 w-3/4 mx-auto" />
					<Skeleton className="h-4 w-full mx-auto" />
				</div>
			) : (
				Object.entries(grouped).map(([type, items]) => <JenisInventaris key={type} type={type} items={items} room={room || []} />)
			)}
		</div>
	);
};

export default CetakLaporan;
