"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useQRScanner from "./useQRScanner";
import Image from "next/image";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QRScanner() {
	const router = useRouter();
	const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
	const [hasScanned, setHasScanned] = useState(false);

	const { inventoryData, isLoadingInventory, setId, roomData, isLoadingRoom } = useQRScanner();

	const startScanner = useCallback(() => {
		const html5QrCode = new Html5Qrcode("reader");
		html5QrCodeRef.current = html5QrCode;

		Html5Qrcode.getCameras().then((devices) => {
			if (devices && devices.length) {
				const cameraId = devices[0].id;
				html5QrCode.start(
					cameraId,
					{ fps: 10, qrbox: 250 },
					(decodedText) => {
						setHasScanned(true);
						setId(decodedText);
						html5QrCode.stop();
					},
					(errorMessage) => {
						console.log("Scan error:", errorMessage);
					}
				);
			}
		});
	}, []);

	const resetScanner = () => {
		setHasScanned(false);
		startScanner();
	};

	useEffect(() => {
		startScanner();
		return () => {
			html5QrCodeRef.current?.stop().catch((err) => console.error("Stop error:", err));
		};
	}, []);

	return (
		<div className="flex justify-center items-center min-h-screen bg-muted p-4">
			<div className="space-y-6 w-full max-w-xl">
				<Card>
					<CardHeader>
						<div className="relative w-full">
							<CardTitle className="text-center">QR Code Scanner</CardTitle>
							<Button onClick={() => router.push("/auth/login")} className="absolute z-[10] top-0 right-0 bg-primary" size="icon" type="button">
								<Home className="h-4 w-4" />
							</Button>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div id="reader" className="w-full rounded-md border shadow" />
						{hasScanned ? (
							<div className="flex justify-center">
								<Button onClick={resetScanner}>Scan Ulang</Button>
							</div>
						) : (
							<p className="text-center text-sm text-muted-foreground">Arahkan kamera ke QR Code</p>
						)}
					</CardContent>
				</Card>

				{/* Inventory Result */}
				{isLoadingInventory && isLoadingRoom ? (
					<Card>
						<CardHeader>
							<CardTitle>Memuat data...</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<Skeleton className="h-4 w-3/4" />
							<Skeleton className="h-4 w-1/2" />
							<Skeleton className="h-4 w-full" />
						</CardContent>
					</Card>
				) : inventoryData && hasScanned && roomData ? (
					<Card>
						<Image src={inventoryData.image} alt={inventoryData.name} width={500} height={500} className="mx-auto" />
						<CardHeader>
							<CardTitle>Detail Inventaris</CardTitle>
						</CardHeader>
						<CardContent className="text-sm">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<p>
									<strong>Kode:</strong> {inventoryData.code}
								</p>
								<p>
									<strong>Nama:</strong> {inventoryData.name}
								</p>
								<p>
									<strong>Merk:</strong> {inventoryData.brand}
								</p>
								<p>
									<strong>Jenis:</strong> {inventoryData.type}
								</p>
								<p>
									<strong>Bahan:</strong> {inventoryData.material}
								</p>
								<p>
									<strong>Tahun:</strong> {inventoryData.year}
								</p>
								<p>
									<strong>Jumlah:</strong> {inventoryData.quantity}
								</p>
								<p>
									<strong>Kondisi:</strong> {inventoryData.condition}
								</p>
								{inventoryData.mutationRemarks && (
									<p className="sm:col-span-2">
										<strong>Keterangan Mutasi:</strong> {inventoryData.mutationRemarks}
									</p>
								)}
								{inventoryData.type !== "vehicle" && (
									<p className="sm:col-span-2">
										<strong>Ruangan:</strong> {roomData?.name || "Tidak ada ruangan yang ditetapkan"}
									</p>
								)}
							</div>

							{inventoryData.type === "vehicle" && inventoryData.vehicle_details && (
								<div className="mt-6 border-t pt-4">
									<p className="font-semibold mb-2">Detail Kendaraan:</p>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<p>
											<strong>No Rangka:</strong> {inventoryData.vehicle_details.chassis_number}
										</p>
										<p>
											<strong>No Mesin:</strong> {inventoryData.vehicle_details.engine_number}
										</p>
										<p>
											<strong>No Polisi:</strong> {inventoryData.vehicle_details.license_plate}
										</p>
										<p>
											<strong>No BPKB:</strong> {inventoryData.vehicle_details.bpkb_number}
										</p>
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				) : (
					hasScanned && (
						<Card>
							<CardHeader>
								<CardTitle>Data tidak ditemukan</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">QR tidak sesuai dengan inventaris yang terdaftar.</p>
							</CardContent>
						</Card>
					)
				)}
			</div>
		</div>
	);
}
