"use client";
import { useParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import useCetakQR from "./useCetakQR";
import { Spinner } from "@/components/ui/spinner";

const CetakQR = () => {
	const id = useParams().id as string;
	const qrRef = useRef<HTMLDivElement>(null);
	const { inventoryData, isLoadingInventory } = useCetakQR();

	useEffect(() => {
		const downloadAndClose = async () => {
			if (!qrRef.current) return;
			const canvas = await html2canvas(qrRef.current);
			const imgData = canvas.toDataURL("image/png");

			const link = document.createElement("a");
			link.href = imgData;
			link.download = `qr-${inventoryData?.name}.png`;
			link.click();

			// Tunggu sedikit sebelum menutup agar download berjalan
			setTimeout(() => {
				window.close();
			}, 1000);
		};

		// Jalankan saat semua sudah render
		if (inventoryData && !isLoadingInventory) {
			downloadAndClose();
		}
	}, [id, inventoryData, isLoadingInventory]);

	return (
		<>
			{isLoadingInventory ? (
				<Spinner className="w-10 h-10 m-auto mt-20" />
			) : (
				<div className="flex flex-col items-center justify-center bg-gray-100 p-4 m-0">
					<div className="bg-white shadow-lg p-6 border">
						<div ref={qrRef} className="flex flex-col items-center gap-4 bg-white p-4">
							<h1 className="text-2xl font-bold text-center">QR Code : {inventoryData?.name}</h1>
							<QRCodeCanvas value={id} size={200} title={`QR Code for ID: ${id}`} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CetakQR;
