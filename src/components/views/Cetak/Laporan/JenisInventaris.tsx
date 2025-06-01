import { Check } from "lucide-react";
import { InventorySelected } from "@/types/Inventory";
import { RoomSelected } from "@/types/Room";
import Image from "next/image";
import { formatDate } from "@/lib/date";
import { translateTypeFromBackend } from "@/lib/utils";

interface PropsType {
	type: string;
	items: InventorySelected[];
	room: RoomSelected[];
}

const JenisInventaris = ({ type, items, room }: PropsType) => {
	return (
		<div className="w-full bg-white shadow-lg p-10 border mb-10 print:shadow-none print:border-none print:break-after-page">
			{/* Kop Surat */}
			<header className="relative border-b pb-4 mb-6 flex items-center">
				<Image src="/logo-purwakarta.png" width={100} height={100} alt="Logo" className="absolute h-28 w-28 mr-4" />
				<div className="text-center w-full">
					<h1 className="text-md uppercase">PEMERINTAH KABUPATEN PURWAKARTA</h1>
					<h1 className="text-md uppercase">DINAS KESEHATAN</h1>
					<h1 className="text-xl font-bold uppercase">UPTD PUSKESMAS BUNGURSARI</h1>
					<p className="text-sm">Jl. Raya Bungursari No. 122 Telp. (0264) 350176</p>
					<p className="text-sm">Email: pkmbungursari@gmail.com</p>
				</div>
			</header>

			<h2 className="text-center text-md font-semibold uppercase">Daftar Inventaris</h2>
			<h2 className="text-center text-md font-semibold mb-4">No. KODE LOKASI : 12.10.10.07.01-018</h2>

			<table className="table-auto border-collapse border border-gray-300 w-full text-sm">
				<caption className="text-start text-sm mb-4">Jenis: {translateTypeFromBackend(type)}</caption>
				<thead>
					<tr className="bg-gray-200 text-center">
						<th rowSpan={2} className="border border-black">
							No.
						</th>
						<th rowSpan={2} className="border border-black">
							Ruang
						</th>
						<th rowSpan={2} className="border border-black">
							Kode Barang
						</th>
						<th rowSpan={2} className="border border-black">
							Nama Barang
						</th>
						<th rowSpan={2} className="border border-black">
							Merek/Type
						</th>
						<th rowSpan={2} className="border border-black">
							Bahan
						</th>
						<th rowSpan={2} className="border border-black">
							Tahun
						</th>
						<th rowSpan={2} className="border border-black">
							Jumlah
						</th>
						<th colSpan={3} className="border border-black">
							Kondisi
						</th>
						<th rowSpan={2} className="border border-black">
							Keterangan
						</th>
					</tr>
					<tr className="bg-gray-200 text-center">
						<th className="border border-black">Baik</th>
						<th className="border border-black">Rusak Ringan</th>
						<th className="border border-black">Rusak Berat</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item, i) => (
						<tr key={item._id} className="hover:bg-gray-100 text-center">
							<td className="border border-gray-300 px-2 py-1">{i + 1}</td>
							<td className="border border-gray-300 px-2 py-1">{room.find((r) => r._id === item.room)?.name || "Tidak Diketahui"}</td>
							<td className="border border-gray-300 px-2 py-1">{item.code}</td>
							<td className="border border-gray-300 px-2 py-1">{item.name}</td>
							<td className="border border-gray-300 px-2 py-1">{item.condition}</td>
							<td className="border border-gray-300 px-2 py-1">{item.material}</td>
							<td className="border border-gray-300 px-2 py-1">{item.year}</td>
							<td className="border border-gray-300 px-2 py-1">{item.quantity}</td>
							<td className="border border-gray-300 px-2 py-1">{item.condition === "good" && <Check />}</td>
							<td className="border border-gray-300 px-2 py-1">{item.condition === "fair" && <Check />}</td>
							<td className="border border-gray-300 px-2 py-1">{item.condition === "damaged" && <Check />}</td>
							<td className="border border-gray-300 px-2 py-1">{item.mutationRemarks || "-"}</td>
						</tr>
					))}
				</tbody>
			</table>
			{/* Tanda Tangan */}
			<div className="mt-16 text-sm mx-4">
				<div className="flex justify-between">
					{/* Kiri */}
					<div className="text-center">
						<p className="mb-2">Purwakarta, {formatDate(new Date())}</p>
						<p className="mb-12">Kepala Puskesmas Bungursari</p>
						<p className="mt-2 capitalize font-semibold underline">{"drg. Suzie Deciana Rachmawati"}</p>
						<p>NIP : 19661224 199403 2 001</p>
					</div>

					{/* Kanan */}
					<div className="text-center">
						<p className="mb-2">Mengetahui,</p>
						<p className="mb-12">Penanggung Jawab Inventaris</p>
						<p className="mt-2 capitalize font-semibold underline">{"Yoppa Nugraha Nurul I, A.Md. Kes"}</p>
						<p>NIP : 19970613 202203 1 007</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default JenisInventaris;
