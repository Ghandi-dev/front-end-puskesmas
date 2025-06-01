"use client";

import DynamicDialog from "@/components/commons/dialog/DynamicDialog";
import { MultiSelect } from "@/components/commons/multi-select/MultiSelect";
import { Button } from "@/components/ui/button";
import { CONDITION } from "@/constant/list.constants";
import { MenuSquare, Printer } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import useLaporan from "./useLaporan";
import CetakLaporan from "../../Cetak/Laporan/CetakLaporan";
import { TYPE } from "@/types/Inventory";

const Laporan = () => {
	const router = useRouter();
	const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

	const { dataInventories, isLoadingInventories, condition, setCondition, setRoom, dataRooms, room, setType, type } = useLaporan();

	const topContent = useMemo(
		() => (
			<div className="flex flex-row items-end justify-between gap-4 lg:items-center">
				<div className="flex items-center gap-4 w-full lg:max-w-[70%]">
					<Button className="bg-primary" onClick={() => setIsFilterDialogOpen(true)}>
						Filter
						<MenuSquare />
					</Button>
					{/* <Button className="bg-primary" onClick={() => ""}>
						Cetak
						<Printer />
					</Button> */}
				</div>
				<Button className="bg-primary" onClick={() => router.push("kendaraan/create")}>
					<Printer />
					{"Cetak Laporan"}
				</Button>
			</div>
		),
		[router]
	);
	return (
		<div className="flex flex-1 flex-col gap-4">
			{topContent}

			<CetakLaporan inventories={dataInventories?.data} isLoading={isLoadingInventories} room={dataRooms} />

			<DynamicDialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen} title="Filter">
				<MultiSelect
					className="w-full"
					placeholder="Pilih Jenis Inventaris"
					maxCount={1}
					onValueChange={setType || (() => {})}
					options={Object.values(TYPE).map((status) => ({ label: status, value: status })) || []}
					defaultValue={type}
				/>
				<MultiSelect
					className="w-full"
					placeholder="Pilih Kondisi"
					maxCount={1}
					onValueChange={setCondition || (() => {})}
					options={Object.values(CONDITION).map((status) => ({ label: status, value: status })) || []}
					defaultValue={condition}
				/>
				<MultiSelect
					className="w-full"
					placeholder="Pilih Ruangan"
					maxCount={1}
					onValueChange={setRoom || (() => {})}
					options={dataRooms?.map((room) => ({ label: room.name, value: room._id })) || []}
					defaultValue={room}
				/>
			</DynamicDialog>
		</div>
	);
};

export default Laporan;
