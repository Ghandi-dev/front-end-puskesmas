"use client";
import useMediaHandling from "@/hooks/useMediaHandling";
import inventarisService from "@/service/invetaris.service";
import roomServices from "@/service/room.service";
import { Inventory, inventorySchema } from "@/types/Inventory";
import { RoomSelected } from "@/types/Room";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useCreate = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { isPendingMutateUploadFile, isPendingMutateDeleteFile, handleDeleteFile, handleUploadFile } = useMediaHandling();

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

	const createInventory = async (data: Inventory) => {
		const res = await inventarisService.create(data);
		return res.data;
	};

	const { mutate: createInventoryMutate, isPending: isPendingCreateInventory } = useMutation({
		mutationFn: createInventory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["Inventories_medic"] });
			toast.success("Berhasil menambahkan inventaris");
			form.reset();
			router.push("/admin/inventaris/medis");
		},
		onError: (error) => {
			toast.error(`Gagal menambahkan inventaris: ${error instanceof Error ? error.message : "Unknown error"}`);
		},
	});

	const handleCreateInventory = (data: Inventory) => {
		createInventoryMutate(data);
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
		form,
		handleCreateInventory,
		createInventoryMutate,
		isPendingCreateInventory,

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

export default useCreate;
