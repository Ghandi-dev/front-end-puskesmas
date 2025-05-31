import NonMedis from "@/components/views/Admin/Inventaris/NonMedis/NonMedis";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Puskesmas | Non Medis",
	description: "Halaman Non Medis untuk mengelola inventaris non medis di Puskesmas",
};

export default function Page() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<NonMedis />
		</div>
	);
}
