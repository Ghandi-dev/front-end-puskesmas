import Create from "@/components/views/Admin/Inventaris/Medis/Create/Create";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Puskesmas | Create Non-Medis Inventory",
};

export default function Page() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<Create />
		</div>
	);
}
