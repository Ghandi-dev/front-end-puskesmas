"use client";
import authServices from "@/service/auth.service";
import { Profile } from "@/types/Auth";
import { useQuery } from "@tanstack/react-query";
// import { usePathname } from "next/navigation";

const useProfile = () => {
	// const pathName = usePathname();
	const getProfile = async () => {
		const { data } = await authServices.getProfile();
		return data.data as Profile;
	};
	const { data: dataProfile, refetch: refetchProfile, isLoading: isLoadingProfile } = useQuery({ queryKey: ["profile"], queryFn: getProfile, enabled: false });

	return {
		dataProfile,
		refetchProfile,
		isLoadingProfile,
	};
};

export default useProfile;
