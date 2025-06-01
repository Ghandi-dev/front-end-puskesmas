"use client";

import dashboardServices from "@/service/dasboard.service";
import { useQuery } from "@tanstack/react-query";

const useDashboard = () => {
	const getDashboardData = async () => {
		const res = await dashboardServices.getAll();
		return res.data.data;
	};
	const { data: dashboardData, isLoading: isLoadingDashboard } = useQuery({
		queryKey: ["dashboard"],
		queryFn: getDashboardData,
		enabled: true,
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
		refetchOnMount: true,
	});
	return {
		dashboardData,
		isLoadingDashboard,
	};
};

export default useDashboard;
