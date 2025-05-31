import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constant/list.constants";
import useDebounce from "./useDebounce";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const useChangeUrl = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const debounce = useDebounce();

	const limitParams = searchParams.get("limit");
	const pageParams = searchParams.get("page");

	const currentLimit = limitParams ?? LIMIT_DEFAULT;
	const currentPage = pageParams ?? PAGE_DEFAULT;
	const currentSearch = searchParams.get("search") ?? "";

	const [condition, setCondition] = useState<string[]>([]);
	const [room, setRoom] = useState<string[]>([]);
	const [year, setYear] = useState<{ start: number | null; end: number | null }>({
		start: 0,
		end: new Date().getFullYear(),
	});

	const updateParams = (params: Record<string, string | number>) => {
		const url = new URLSearchParams(searchParams);

		Object.entries(params).forEach(([key, value]) => {
			if (value === "") {
				url.delete(key);
			} else {
				url.set(key, `${value}`);
			}
		});

		router.push(`?${url.toString()}`);
	};

	const setUrl = () => {
		updateParams({
			limit: currentLimit,
			page: currentPage,
			search: currentSearch,
		});
	};

	const setUrlExplore = () => {
		updateParams({
			limit: currentLimit,
			page: currentPage,
		});
	};

	const handleChangePage = (page: number) => {
		updateParams({ page: String(page) });
	};

	const handleChangeLimit = (value: string) => {
		debounce(() => {
			updateParams({ limit: value, page: PAGE_DEFAULT });
		}, DELAY);
	};

	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		debounce(() => {
			const search = e.target.value;
			updateParams({ search, page: PAGE_DEFAULT });
		}, DELAY);
	};

	const handleClearSearch = () => {
		updateParams({ search: "", page: PAGE_DEFAULT });
	};

	return {
		limitParams,
		pageParams,
		currentLimit,
		currentPage,
		currentSearch,
		setUrl,
		setUrlExplore,
		handleChangePage,
		handleChangeLimit,
		handleChangeSearch,
		handleClearSearch,

		condition,
		setCondition,
		room,
		setRoom,
		year,
		setYear,
	};
};

export default useChangeUrl;
