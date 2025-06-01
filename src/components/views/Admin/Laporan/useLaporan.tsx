"use client";

import { CONDITION } from "@/constant/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { translateConditionToBackend, translateTypeToBackend } from "@/lib/utils";
import inventarisService from "@/service/invetaris.service";
import roomServices from "@/service/room.service";
import { TYPE } from "@/types/Inventory";
import { RoomSelected } from "@/types/Room";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useLaporan = () => {
	const { currentLimit, currentPage, currentSearch, condition, room, year, setCondition, setRoom, setYear } = useChangeUrl();
	const [type, setType] = useState<string[]>([]);

	const getInventories = async () => {
		let params = `limit=${currentLimit}&page=${currentPage}`;
		if (currentSearch) {
			params += `&search=${currentSearch}`;
		}
		if (condition) {
			params += `&condition=${translateConditionToBackend(condition as CONDITION[])}`;
		}
		if (room) {
			params += `&room=${room}`;
		}
		if (type) {
			params += `&type=${translateTypeToBackend(type as TYPE[])}`;
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
		queryKey: ["Inventories", currentLimit, currentPage, currentSearch, condition, room, year, type],
		queryFn: getInventories,
		enabled: !!currentLimit && !!currentPage,
	});

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
		isLoadingInventories,
		refetchInventories,
		condition,
		room,
		year,
		setCondition,
		setRoom,
		setYear,
		dataRooms,
		isLoadingRooms,
		type,
		setType,
	};
};

export default useLaporan;
