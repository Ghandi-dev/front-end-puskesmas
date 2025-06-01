import LaporanPage from "@/components/views/Cetak/Laporan/LaporanPage";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Puskesmas | Cetak Laporan",
};

const Page = () => {
	return <LaporanPage />;
};

export default Page;
