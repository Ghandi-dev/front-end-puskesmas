"use client";

import { useEffect, useState } from "react";
import CetakLaporan from "./CetakLaporan";
import { InventorySelected } from "@/types/Inventory";
import { RoomSelected } from "@/types/Room";

const LaporanPage = () => {
	const [inventories, setInventories] = useState<InventorySelected[] | null>(null);
	const [rooms, setRooms] = useState<RoomSelected[] | null>(null);

	useEffect(() => {
		const stored = localStorage.getItem("laporanFilters");
		if (stored) {
			const parsed = JSON.parse(stored);
			setInventories(parsed.inventories || []);
			setRooms(parsed.rooms || []);
		}
	}, []);

	console.log("inventories", inventories);
	console.log("rooms", rooms);

	if (!inventories || !rooms) {
		return <div>Loading...</div>;
	}

	return <CetakLaporan inventories={inventories} isLoading={false} room={rooms} />;
};

export default LaporanPage;
