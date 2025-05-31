import Kendaraan from "@/components/views/Admin/Inventaris/Kendaraan/Kendaraan";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Puskesmas | Kendaraan",
	description: "Halaman Kendaraan untuk mengelola inventaris kendaraan di Puskesmas",
};

export default function Page() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<Kendaraan />
		</div>
	);
}
