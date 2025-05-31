"use client";

import { FileUploadWithLabel } from "@/components/commons/inputs/FileUploadWithLabel";
import { InputWithLabel } from "@/components/commons/inputs/InputWithLabel";
import { SelectPopoverWithLabel } from "@/components/commons/inputs/SelectPopoverWithLabel";
import { SelectWithLabel } from "@/components/commons/inputs/SelectWithLabel";
import { SelectYearWithLabel } from "@/components/commons/inputs/SelectYearWithLabel";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { Inventory } from "@/types/Inventory";
import { RoomSelected } from "@/types/Room";
import useDetailNonMedis from "./useDetailNonMedis";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { TextareaWithLabel } from "@/components/commons/inputs/TextAreaWithLabel";

const DetailNonMedis = () => {
	const {
		inventoryData,

		form,
		handleUpdateInventory,
		isPendingUpdateInventory,

		dataRooms,
		isLoadingRooms,

		isPendingMutateUploadFile,
		isPendingMutateDeleteFile,
		handleUploadImage,
		handleDeleteImage,
		preview,
	} = useDetailNonMedis();

	useEffect(() => {
		if (inventoryData) {
			form.reset({
				...inventoryData,
				room: inventoryData?.room || "",
			});
		}
	}, [inventoryData]);

	return (
		<div className="flex flex-col gap-4 p-6 md:p-10">
			<h1 className="text-2xl font-bold">Update Inventaris Non Medis</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleUpdateInventory)} className="mt-4 flex flex-col gap-4">
					<div className={cn("grid grid-cols-1 lg:grid-cols-2 items-start", Object.keys(form.formState.errors).length > 0 ? "gap-6" : "gap-6")}>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
							<InputWithLabel<Inventory> fieldTitle="Kode" nameInSchema="code" />
							<InputWithLabel<Inventory> fieldTitle="Nama" nameInSchema="name" />
							<InputWithLabel<Inventory> fieldTitle="Merk/Tipe" nameInSchema="brand" />
							<InputWithLabel<Inventory> fieldTitle="Material" nameInSchema="material" />
							<SelectYearWithLabel<Inventory> fieldTitle="Tahun" nameInSchema="year" />
							<InputWithLabel<Inventory> fieldTitle="Jumlah" nameInSchema="quantity" />
							<SelectWithLabel<Inventory>
								fieldTitle="Kondisi"
								nameInSchema="condition"
								options={[
									{ value: "good", label: "Baik" },
									{ value: "fair", label: "Kurang Baik" },
									{ value: "damaged", label: "Rusak Berat" },
								]}
							/>
							{!isLoadingRooms ? (
								<SelectPopoverWithLabel<Inventory>
									fieldTitle="Ruangan"
									nameInSchema="room"
									options={dataRooms?.map((room: RoomSelected) => ({ value: room._id, label: room.name })) || []}
								/>
							) : (
								<div className="">
									<Skeleton className="h-4 w-full mb-2" />
									<Skeleton className="h-8 w-full" />
								</div>
							)}
							<div className="col-span-full">
								<TextareaWithLabel<Inventory> fieldTitle="Keterangan Mutasi" nameInSchema="mutationRemarks" className="w-full resize-none" />
							</div>
						</div>
						<div className="min-h-70 h-full">
							<FileUploadWithLabel<Inventory>
								fieldTitle="Gambar"
								nameInSchema="image"
								isDropable
								isUploading={isPendingMutateUploadFile}
								isDeleting={isPendingMutateDeleteFile}
								preview={typeof preview === "string" ? preview : ""}
								onUpload={handleUploadImage}
								onDelete={handleDeleteImage}
							/>
						</div>
					</div>
					<div className="flex items-center justify-end gap-4 mt-4">
						<Button type="submit" className="w-full lg:w-2/12 bg-primary" disabled={isPendingUpdateInventory}>
							{isPendingUpdateInventory ? <Spinner /> : "Simpan"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default DetailNonMedis;
