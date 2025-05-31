import DetailNonMedis from "@/components/views/Admin/Inventaris/NonMedis/Detail/DetailNonMedis";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Puskesmas | Detail Non Medis",
	description: "Halaman detail inventaris non medis",
};

export default function Page() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<DetailNonMedis />
		</div>
	);
}
