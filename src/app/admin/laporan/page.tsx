import Laporan from "@/components/views/Admin/Laporan/Laporan";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Puskesmas | Dashboard",
};

export default function Page() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<Laporan />
		</div>
	);
}
