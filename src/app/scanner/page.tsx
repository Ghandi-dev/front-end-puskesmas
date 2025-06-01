import QRScanner from "@/components/views/Scanner/QRScanner";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Puskesmas | Scanner",
	description: "Halaman Scanner untuk memindai QR Code di Puskesmas",
};

export default function Page() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<QRScanner />
		</div>
	);
}
