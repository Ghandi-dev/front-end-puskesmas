import { Component, FileText, Hospital, InspectionPanel, ScanQrCode } from "lucide-react";

const MENU_LIST = [
	{
		title: "Dashboard",
		url: "/admin/dashboard",
		icon: Component,
	},
	{
		title: "Inventaris",
		url: "/admin/inventaris",
		icon: InspectionPanel,
		isActive: true,
		items: [
			{
				title: "Non Medis",
				url: "/admin/inventaris/non-medis",
			},
			{
				title: "Medis",
				url: "/admin/inventaris/medis",
			},
			{
				title: "Kendaraan",
				url: "/admin/inventaris/kendaraan",
			},
		],
	},
	{
		title: "Ruangan",
		url: "/admin/ruangan",
		icon: Hospital,
	},
	{
		title: "Laporan",
		url: "/admin/laporan",
		icon: FileText,
	},
	{
		title: "Scan QR Code",
		url: "/scanner",
		icon: ScanQrCode,
	},
];

export { MENU_LIST };
