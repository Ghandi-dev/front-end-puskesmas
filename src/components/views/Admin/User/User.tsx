"use client";

import { Key, useCallback, useEffect, useMemo, useState } from "react";
import useUser from "./useUser";
import useChangeUrl from "@/hooks/useChangeUrl";
import DataTable from "@/components/commons/table/DataTable";
import DynamicDialog from "@/components/commons/dialog/DynamicDialog";
import { Register, UserSelected } from "@/types/Auth";
import { COLUMN_LIST_USER } from "./User.constant";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ROLES } from "@/constant/list.constants";
import AlertDialogUpdate from "@/components/commons/alert-dialog/AlertDialogUpdate";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { InputWithLabel } from "@/components/commons/inputs/InputWithLabel";
import { InputPasswordWithLabel } from "@/components/commons/inputs/InputPasswordWithLabel";

const User = () => {
	const { setUrl, handleChangeSearch } = useChangeUrl();

	const {
		dataUsers,
		isLoadingUsers,

		setSelectedUser,

		form,
		handleCreateUser,
		isPendingMutateCreateUser,

		handleUpdateUser,
		isPendingMutateUpdateUser,
	} = useUser();

	useEffect(() => {
		setUrl();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

	console.log("dataUsers", dataUsers);

	const renderCell = useCallback(
		(user: UserSelected, columnKey: Key) => {
			const cellValue = typeof columnKey === "string" && columnKey in user ? user[columnKey as keyof typeof user] : null;

			switch (columnKey) {
				case "actions":
					return (
						<Button
							className="bg-primary"
							onClick={() => {
								setSelectedUser(user);
								setIsUpdateDialogOpen(true);
							}}
						>
							Ubah ke {user?.role !== ROLES.ADMIN ? "Admin" : "Super Admin"}
						</Button>
					);
				default:
					return cellValue as React.ReactNode;
			}
		},
		[setSelectedUser]
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
					Tambah User
				</Button>
			</div>
		),
		[handleChangeSearch]
	);

	return (
		<div>
			<DataTable<UserSelected>
				topContent={topContent}
				data={dataUsers || []}
				isLoading={isLoadingUsers}
				columns={COLUMN_LIST_USER}
				emptyContent="Tidak ada data"
				renderCell={renderCell}
				totalPages={dataUsers?.pagination?.totalPages || 0}
				showLimit
			/>
			{/* Form create user */}
			<DynamicDialog title="Form Tambah User" open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} isModal>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleCreateUser)} className="mt-4 flex flex-col gap-4">
						<InputWithLabel<Register> fieldTitle="Username" nameInSchema="username" />
						<InputWithLabel<Register> fieldTitle="Nama" nameInSchema="fullname" />
						<InputWithLabel<Register> fieldTitle="Email" nameInSchema="email" />
						<InputPasswordWithLabel<Register> fieldTitle="Password" nameInSchema="password" />
						<InputPasswordWithLabel<Register> fieldTitle="Konfirmasi Password" nameInSchema="passwordConfirm" />
						<Button type="submit" className="w-full bg-primary" disabled={isPendingMutateCreateUser}>
							{isPendingMutateCreateUser ? <Spinner /> : "Simpan"}
						</Button>
					</form>
				</Form>
			</DynamicDialog>

			{/* Alert Dialog Update */}
			<AlertDialogUpdate
				open={isUpdateDialogOpen}
				onOpenChange={setIsUpdateDialogOpen}
				onClickUpdate={handleUpdateUser} // TODO: implement delete action
				title="Konfirmasi Update Role"
				description="Apakah kamu yakin ingin update role user ini?"
				isLoading={isPendingMutateUpdateUser}
			/>
			{/* Alert Dialog Delete */}
			{/* <AlertDialogDelete
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
				onClickDelete={handleDeleteRoom} // TODO: implement delete action
				title="Konfirmasi Hapus"
				description="Apakah kamu yakin ingin menghapus data ini?"
			/> */}
		</div>
	);
};

export default User;
