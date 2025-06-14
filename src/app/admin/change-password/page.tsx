import ChangePassword from "@/components/views/Auth/ChangePassword/ChangePassword";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Puskesmas | Users",
	description: "Halaman untuk mengganti password user",
};

export default function Page() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<ChangePassword />
		</div>
	);
}
