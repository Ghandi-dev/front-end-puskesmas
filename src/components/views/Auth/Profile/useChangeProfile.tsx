"use client";
import environment from "@/config/environment";
import useMediaHandling from "@/hooks/useMediaHandling";
import authServices from "@/service/auth.service";
import { UpdateProfile, updateProfileSchema } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useChangeProfile = () => {
	const { isPendingMutateUploadFile, isPendingMutateDeleteFile, handleDeleteFile, handleUploadFile } = useMediaHandling();

	const updatePassword = async (payload: UpdateProfile) => {
		const { data } = await authServices.updateProfile(payload);
		return data.data;
	};

	const form = useForm({
		mode: "onChange",
		resolver: yupResolver(updateProfileSchema),
		defaultValues: {
			fullname: "",
			email: "",
			profilePicture: "",
		},
	});

	const {
		mutate: mutateUpdateProfile,
		isPending: isPendingUpdateProfile,
		isSuccess: isSuccessUpdateProfile,
	} = useMutation({
		mutationFn: updatePassword,
		onSuccess: () => {
			toast.success("Data berhasil disimpan");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleUpdateProfile = () => {
		const payload = form.getValues();
		mutateUpdateProfile(payload);
	};

	const preview = form.watch("profilePicture");
	const fileUrl = form.getValues("profilePicture");

	const handleUploadImage = (files: FileList, onChange: (files: FileList | undefined) => void) => {
		handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
			if (fileUrl) {
				form.setValue("profilePicture", fileUrl);
			}
		});
	};

	const handleDeleteImage = (onChange: (files: FileList | undefined) => void) => {
		if (fileUrl === environment.DEFAULT_PHOTO_PROFILE) {
			form.setValue("profilePicture", "");
		} else {
			handleDeleteFile(fileUrl, () => onChange(undefined));
		}
	};

	const handleOnClose = (onClose: () => void) => {
		handleDeleteFile(fileUrl, () => {
			form.setValue("profilePicture", "");
			toast.success("Gambar berhasil dihapus");
			onClose();
		});
	};

	return {
		form,

		preview,
		fileUrl,
		mutateUpdateProfile,
		isPendingUpdateProfile,
		isSuccessUpdateProfile,
		handleUpdateProfile,

		isPendingMutateUploadFile,
		isPendingMutateDeleteFile,
		handleUploadImage,
		handleDeleteImage,
		handleOnClose,
	};
};

export default useChangeProfile;
