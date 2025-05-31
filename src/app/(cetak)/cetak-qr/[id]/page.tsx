import CetakQR from "@/components/views/Cetak/QR/CetakQR";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Puskesmas | Cetak QR",
};

const Page = () => {
	return <CetakQR />;
};

export default Page;
