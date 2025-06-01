"use client";

import { Key, useCallback, useEffect, useMemo, useState } from "react";
import useRoom from "./useRoom";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Room, RoomSelected } from "@/types/Room";
import ButtonAction from "@/components/commons/button/ButtonAction";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/commons/table/DataTable";
import { COLUMN_LIST_ROOM } from "./Room.constant";
import AlertDialogDelete from "@/components/commons/alert-dialog/AlertDialogDelete";
import DynamicDialog from "@/components/commons/dialog/DynamicDialog";
import { Form } from "@/components/ui/form";
import { InputWithLabel } from "@/components/commons/inputs/InputWithLabel";
import { Spinner } from "@/components/ui/spinner";

const RoomPage = () => {
	const { setUrl, handleChangeSearch } = useChangeUrl();
	const {
		form,

		dataRooms,
		isLoadingRooms,
		setSelectedIdRoom,

		isPendingCreateRoom,

		handleCreateRoom,
		handleDeleteRoom,
	} = useRoom();

	useEffect(() => {
		setUrl();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

	const renderCell = useCallback(
		(room: RoomSelected, columnKey: Key) => {
			const cellValue = typeof columnKey === "string" && columnKey in room ? room[columnKey as keyof typeof room] : null;

			switch (columnKey) {
				case "actions":
					return (
						<ButtonAction
							hiddenButtonDetail
							hiddenButtonQR
							onPressButtonDelete={() => {
								setSelectedIdRoom(room?._id);
								setIsDeleteDialogOpen(true);
							}}
						/>
					);
				default:
					return cellValue as React.ReactNode;
			}
		},
		[setSelectedIdRoom]
	);

	const topContent = useMemo(
		() => (
			<div className="flex flex-col-reverse items-end justify-between gap-4 lg:flex-row lg:items-center">
				<div className="flex items-center gap-4 w-full lg:max-w-[70%]">
					<div className="relative w-full lg:max-w-[30%]">
						<Search className="absolute left-2.5 top-1.5 text-muted-foreground" />
						<Input placeholder="Cari Berdasarkan Nama" className="pl-8" onChange={handleChangeSearch} />
					</div>
					{/* <Button className="bg-primary" onClick={() => ""}>
						Cetak
						<Printer />
					</Button> */}
				</div>
				<Button className="bg-primary" onClick={() => setIsCreateDialogOpen(true)}>
					Tambah Ruangan
				</Button>
			</div>
		),
		[handleChangeSearch]
	);

	return (
		<div>
			<DataTable<RoomSelected>
				topContent={topContent}
				data={dataRooms?.data || []}
				isLoading={isLoadingRooms}
				columns={COLUMN_LIST_ROOM}
				emptyContent="Tidak ada data"
				renderCell={renderCell}
				totalPages={dataRooms?.pagination?.totalPages || 0}
				showLimit
			/>
			{/* Form Add Santri */}
			<DynamicDialog title="Form Tambah Ruangan" open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} isModal>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleCreateRoom)} className="mt-4 flex flex-col gap-4">
						<InputWithLabel<Room> fieldTitle="Nama" nameInSchema="name" />
						<Button type="submit" className="w-full bg-primary" disabled={isPendingCreateRoom}>
							{isPendingCreateRoom ? <Spinner /> : "Simpan"}
						</Button>
					</form>
				</Form>
			</DynamicDialog>
			{/* Form Filter Santri

			{/* Alert Dialog Delete */}
			<AlertDialogDelete
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
				onClickDelete={handleDeleteRoom} // TODO: implement delete action
				title="Konfirmasi Hapus"
				description="Apakah kamu yakin ingin menghapus data ini?"
			/>
		</div>
	);
};

export default RoomPage;
