import { SquareTerminal } from "lucide-react";

const MENU_LIST = [
	{
		title: "Dashboard",
		url: "/admin/dashboard",
		icon: SquareTerminal,
	},
	{
		title: "Inventaris",
		url: "/admin/inventaris",
		icon: SquareTerminal,
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
		icon: SquareTerminal,
	},
	{
		title: "Laporan",
		url: "/admin/laporan",
		icon: SquareTerminal,
	},
];

export { MENU_LIST };
