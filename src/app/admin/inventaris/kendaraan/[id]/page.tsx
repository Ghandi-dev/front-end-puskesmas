import DetailKendaraan from "@/components/views/Admin/Inventaris/Kendaraan/Detail/DetailKendaraan";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Puskesmas | Detail Kendaraan",
	description: "Halaman detail inventaris kendaraan",
};

export default function Page() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<DetailKendaraan />
		</div>
	);
}
