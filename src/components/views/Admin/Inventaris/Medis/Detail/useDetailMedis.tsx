"use client";

import useMediaHandling from "@/hooks/useMediaHandling";
import inventarisService from "@/service/invetaris.service";
import roomServices from "@/service/room.service";
import { inventorySchema, Inventory } from "@/types/Inventory";
import { RoomSelected } from "@/types/Room";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useDetailMedis = () => {
	const queryClient = useQueryClient();
	const id = useParams().id as string;
	const pathName = usePathname();
	const router = useRouter();
	const { isPendingMutateUploadFile, isPendingMutateDeleteFile, handleDeleteFile, handleUploadFile } = useMediaHandling();

	const getInventoryById = async () => {
		const res = await inventarisService.getById(id);
		return res.data.data as Inventory;
	};

	const { data: inventoryData, isLoading: isLoadingInventory } = useQuery({
		queryKey: ["inventory_medic", id, pathName],
		queryFn: getInventoryById,
		enabled: !!id,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
	});

	const form = useForm({
		mode: "onSubmit",
		resolver: yupResolver(inventorySchema),
		defaultValues: {
			code: "",
			name: "",
			brand: "",
			type: "medic",
			material: "",
			year: new Date().getFullYear(),
			quantity: 1,
			condition: "good",
			mutationRemarks: "",
			room: "",
			image: "",
		},
	});

	const updateInventory = async ({ id, data }: { id: string; data: Inventory }) => {
		const res = await inventarisService.update(id, data);
		return res.data;
	};

	const { mutate: updateInventoryMutate, isPending: isPendingUpdateInventory } = useMutation({
		mutationFn: updateInventory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["Inventories_medic"] });
			queryClient.invalidateQueries({ queryKey: ["inventory_medic"] });
			toast.success("Berhasil update inventaris");
			router.push("/admin/inventaris/medis");
		},
		onError: (error) => {
			toast.error(`Gagal update inventaris: ${error instanceof Error ? error.message : "Unknown error"}`);
		},
	});

	const handleUpdateInventory = (data: Inventory) => {
		updateInventoryMutate({ id, data });
	};

	// Upload and delete image handlers
	const preview = form.watch("image");
	const imageUrl = form.getValues("image");

	const handleUploadImage = (files: FileList, onChange: (files: FileList | undefined) => void) => {
		handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
			if (fileUrl) {
				form.setValue("image", fileUrl);
			}
		});
	};

	const handleDeleteImage = (onChange: (files: FileList | undefined) => void) => {
		handleDeleteFile(imageUrl, () => onChange(undefined));
	};

	const handleOnClose = (onClose: () => void) => {
		handleDeleteFile(imageUrl, () => {
			form.setValue("image", "");
			toast.success("Gambar berhasil dihapus");
			onClose();
		});
	};

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
		inventoryData,
		isLoadingInventory,

		form,
		handleUpdateInventory,
		updateInventoryMutate,
		isPendingUpdateInventory,

		dataRooms,
		isLoadingRooms,

		isPendingMutateUploadFile,
		isPendingMutateDeleteFile,
		handleUploadImage,
		handleDeleteImage,
		handleOnClose,
		preview,
		imageUrl,
	};
};

export default useDetailMedis;
