"use client";
import useCreate from "./useCreate";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { InputWithLabel } from "@/components/commons/inputs/InputWithLabel";
import { Inventory } from "@/types/Inventory";
import { SelectWithLabel } from "@/components/commons/inputs/SelectWithLabel";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FileUploadWithLabel } from "@/components/commons/inputs/FileUploadWithLabel";
import { SelectPopoverWithLabel } from "@/components/commons/inputs/SelectPopoverWithLabel";
import { RoomSelected } from "@/types/Room";
import { Skeleton } from "@/components/ui/skeleton";
import { SelectYearWithLabel } from "@/components/commons/inputs/SelectYearWithLabel";

const Create = () => {
	const {
		form,
		handleCreateInventory,
		isPendingCreateInventory,
		isPendingMutateUploadFile,
		isPendingMutateDeleteFile,
		handleUploadImage,
		handleDeleteImage,
		preview,

		dataRooms,
		isLoadingRooms,
	} = useCreate();
	return (
		<div className="flex flex-col gap-4 p-6 md:p-10">
			<h1 className="text-2xl font-bold">Tambah Inventaris Non Medis</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleCreateInventory)} className="mt-4 flex flex-col gap-4">
					<div className={cn("grid grid-cols-1 lg:grid-cols-2 items-start", Object.keys(form.formState.errors).length > 0 ? "gap-6" : "gap-6")}>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
						</div>
						<div>
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
						<Button type="submit" className="w-full lg:w-2/12 bg-primary" disabled={isPendingCreateInventory}>
							{isPendingCreateInventory ? <Spinner /> : "Simpan"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default Create;
