"use client";
import React, { useEffect } from "react";
import useChangeProfile from "./useChangeProfile";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UpdateProfile } from "@/types/Auth";
import { FileUploadWithLabel } from "@/components/commons/inputs/FileUploadWithLabel";
import useProfile from "@/hooks/useProfile";
import { InputWithLabel } from "@/components/commons/inputs/InputWithLabel";

const ChangeProfile = () => {
	const {
		form,
		preview,
		isPendingUpdateProfile,
		isSuccessUpdateProfile,
		handleUpdateProfile,
		isPendingMutateUploadFile,
		isPendingMutateDeleteFile,
		handleUploadImage,
		handleDeleteImage,
	} = useChangeProfile();
	const { dataProfile, isLoadingProfile, refetchProfile } = useProfile();

	useEffect(() => {
		if (dataProfile) {
			form.setValue("fullname", dataProfile.fullname ?? "");
			form.setValue("email", dataProfile.email ?? "");
			form.setValue("profilePicture", dataProfile.profilePicture ?? "");
		}
	}, [dataProfile]);

	useEffect(() => {
		if (isSuccessUpdateProfile) refetchProfile();
	}, [isSuccessUpdateProfile]);

	if (isLoadingProfile) return <Spinner />;
	return (
		<div className="flex flex-col items-center w-full h-screen bg-background gap-4">
			<Card className="p-4 border-none w-full lg:flex items-center h-fit">
				<Form {...form}>
					<form className="flex flex-col gap-6 w-full lg:w-xl" onSubmit={form.handleSubmit(handleUpdateProfile)}>
						<div className="flex flex-col items-start gap-2 text-center w-fit">
							<h1 className="text-md font-bold underline underline-offset-1 underline-primary decoration-primary">Form Ubah Profile</h1>
						</div>
						<div className={cn("flex flex-col", Object.keys(form.formState.errors).length > 0 ? "gap-3" : "gap-6")}>
							<InputWithLabel<UpdateProfile> fieldTitle="Nama Lengkap" nameInSchema="fullname" />
							<InputWithLabel<UpdateProfile> fieldTitle="Email" nameInSchema="email" />
							<div className="h-70">
								<FileUploadWithLabel<UpdateProfile>
									fieldTitle="Foto Profil"
									nameInSchema="profilePicture"
									label={"Foto Profil"}
									isDropable
									preview={typeof preview === "string" ? preview : ""}
									onUpload={(files, onChange) => handleUploadImage(files, onChange)}
									onDelete={(onChange) => handleDeleteImage(onChange)}
								/>
							</div>
						</div>
						<div className="flex justify-end">
							<Button type="submit" className="w-full md:w-auto" disabled={isPendingUpdateProfile || isPendingMutateUploadFile || isPendingMutateDeleteFile}>
								{isPendingUpdateProfile || isPendingMutateUploadFile || isPendingMutateDeleteFile ? <Spinner /> : "Simpan"}
							</Button>
						</div>
					</form>
				</Form>
			</Card>
		</div>
	);
};

export default ChangeProfile;
