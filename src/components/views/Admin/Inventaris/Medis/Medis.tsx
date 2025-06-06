"use client";

import ButtonAction from "@/components/commons/button/ButtonAction";
import DataTable from "@/components/commons/table/DataTable";
import useChangeUrl from "@/hooks/useChangeUrl";
import { InventorySelected } from "@/types/Inventory";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import useMedis from "./useMedis";
import { MenuSquare, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { COLUMN_LIST_NON_MEDIS } from "./Medis.constant";
import { useRouter } from "next/navigation";
import AlertDialogDelete from "@/components/commons/alert-dialog/AlertDialogDelete";
import DynamicDialog from "@/components/commons/dialog/DynamicDialog";
import { MultiSelect } from "@/components/commons/multi-select/MultiSelect";
import { CONDITION } from "@/constant/list.constants";
import { InventoryInfo } from "@/components/commons/inventory/InventoryInfo";

const Medis = () => {
	const router = useRouter();
	const { setUrl, handleChangeSearch } = useChangeUrl();
	const {
		dataInventories,
		isLoadingInventories,
		handleDeleteInventory,
		selectedInventory,
		setSelectedInventory,
		dataRooms,
		condition,
		room,
		setCondition,
		setRoom,
	} = useMedis();

	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
	const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

	useEffect(() => {
		setUrl();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderCell = useCallback(
		(inventory: InventorySelected, columnKey: Key) => {
			const cellValue = typeof columnKey === "string" && columnKey in inventory ? inventory[columnKey as keyof typeof inventory] : null;

			switch (columnKey) {
				case "actions":
					return (
						<ButtonAction
							// hideButtonActivate={true}
							hideButtonDelete
							id={inventory._id}
							onPressButtonDetail={() => {
								router.push(`/admin/inventaris/medis/${inventory._id}`);
							}}
							onPressButtonDelete={() => {
								setSelectedInventory(inventory);
								setIsDeleteDialogOpen(true);
							}}
							onPressButtonInfo={() => {
								setSelectedInventory(inventory);
								setIsInfoDialogOpen(true);
							}}
						/>
					);
				default:
					return cellValue as React.ReactNode;
			}
		},
		[setSelectedInventory]
	);

	const topContent = useMemo(
		() => (
			<div className="flex flex-col-reverse items-end justify-between gap-4 lg:flex-row lg:items-center">
				<div className="flex items-center gap-4 w-full lg:max-w-[70%]">
					<div className="relative w-full lg:max-w-[30%]">
						<Search className="absolute left-2.5 top-1.5 text-muted-foreground" />
						<Input placeholder="Cari Berdasarkan Nama" className="pl-8" onChange={handleChangeSearch} />
					</div>
					<Button className="bg-primary" onClick={() => setIsFilterDialogOpen(true)}>
						Filter
						<MenuSquare />
					</Button>
					{/* <Button className="bg-primary" onClick={() => ""}>
						Cetak
						<Printer />
					</Button> */}
				</div>
				<Button className="bg-primary" onClick={() => router.push("medis/create")}>
					{"Tambah Inventaris"}
				</Button>
			</div>
		),
		[handleChangeSearch]
	);

	return (
		<div>
			<DataTable<InventorySelected>
				topContent={topContent}
				data={dataInventories?.data || []}
				isLoading={isLoadingInventories}
				columns={COLUMN_LIST_NON_MEDIS}
				emptyContent="Tidak ada data"
				renderCell={renderCell}
				totalPages={dataInventories?.pagination?.totalPages || 0}
				showLimit
			/>

			{/* Filter */}
			<DynamicDialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen} title="Filter Non Medis">
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
				{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<SelectYear
						value={year.start ?? undefined}
						onChange={(startYear) => setYear({ ...year, start: startYear })}
						startYear={1970}
						endYear={new Date().getFullYear()}
						className="w-full"
						label="Tahun Mulai"
					/>
					<SelectYear
						value={year.end ?? undefined}
						onChange={(endYear) => setYear({ ...year, end: endYear })}
						startYear={1970}
						endYear={new Date().getFullYear()}
						className="w-full"
						label="Tahun Selesai"
					/>
				</div> */}
			</DynamicDialog>

			{/* info dialog */}
			<DynamicDialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen} title="Informasi Inventaris">
				<InventoryInfo inventory={selectedInventory} />
			</DynamicDialog>

			{/* Alert Dialog Delete */}
			<AlertDialogDelete
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
				onClickDelete={handleDeleteInventory}
				title="Konfirmasi Hapus"
				description="Apakah kamu yakin ingin menghapus data ini?"
			/>
		</div>
	);
};

export default Medis;
