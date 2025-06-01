import RoomPage from "@/components/views/Admin/Room/Room";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Puskesmas | ruangan",
	description: "Halaman untuk mengelola ruangan di Puskesmas",
};

export default function Page() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<RoomPage />
		</div>
	);
}
