import User from "@/components/views/Admin/User/User";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Puskesmas | Users",
	description: "Halaman untuk mengelola user di Puskesmas",
};

export default function Page() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<User />
		</div>
	);
}
