"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import useDashboard from "./useDashboard";
import { translateConditionFromBackend, translateTypeFromBackend } from "@/lib/utils";

const CONDITION_COLOR_MAP: Record<string, string> = {
	good: "#4ade80", // hijau
	fair: "#facc15", // kuning
	damaged: "#f87171", // merah
};

const TYPE_COLOR_MAP: Record<string, string> = {
	non_medic: "#0ea5e9", // sky blue
	medic: "#8b5cf6", // violet
	vehicle: "#f97316", // orange
};

const Dashboard = () => {
	const { dashboardData, isLoadingDashboard } = useDashboard();

	if (isLoadingDashboard) {
		return <div className="text-center text-muted-foreground mt-8">Memuat data dashboard...</div>;
	}

	const totalAssets = dashboardData?.total || 0;

	// Pie Data for Condition
	const pieConditionData = Object.entries(dashboardData?.byCondition || {}).map(([condition, value]) => ({
		key: condition,
		name: translateConditionFromBackend(condition),
		value,
	}));

	// Bar Data for Type
	const barTypeData = Object.entries(dashboardData?.byType || {}).map(([type, count]) => ({
		key: type,
		type: translateTypeFromBackend(type),
		count,
	}));

	return (
		<div className="space-y-6">
			{/* Greeting */}
			<div className="flex flex-col gap-1">
				<h1 className="text-2xl font-bold">Selamat Datang</h1>
				<p className="text-muted-foreground text-sm">Di Sistem Informasi Inventaris Puskesmas Bungursari</p>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Total Inventaris</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{totalAssets}</p>
						<p className="text-muted-foreground text-sm">Semua aset terdaftar</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Kondisi Baik</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{dashboardData.byCondition?.good || 0}</p>
						<p className="text-muted-foreground text-sm">Barang dalam kondisi baik</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Kondisi Kurang Baik</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{dashboardData.byCondition?.fair || 0}</p>
						<p className="text-muted-foreground text-sm">Barang dalam kondisi kurang baik</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Kondisi Rusak Berat</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{dashboardData.byCondition?.damaged || 0}</p>
						<p className="text-muted-foreground text-sm">Perlu perbaikan</p>
					</CardContent>
				</Card>
			</div>

			{/* Charts */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card className="aspect-video">
					<CardHeader>
						<CardTitle>Distribusi Kondisi</CardTitle>
					</CardHeader>
					<CardContent className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie data={pieConditionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
									{pieConditionData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={CONDITION_COLOR_MAP[entry.key]} />
									))}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* Bar Chart Type */}
				<Card className="aspect-video">
					<CardHeader>
						<CardTitle>Jumlah Aset per Tipe</CardTitle>
					</CardHeader>
					<CardContent className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={barTypeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="type" />
								<YAxis allowDecimals={false} />
								<Tooltip />
								<Legend />
								<Bar dataKey="count" name="Jumlah Aset">
									{barTypeData.map((entry, index) => (
										<Cell key={`cell-bar-${index}`} fill={TYPE_COLOR_MAP[entry.key]} />
									))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Dashboard;
