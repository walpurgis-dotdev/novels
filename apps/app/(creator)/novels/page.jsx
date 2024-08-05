"use client";

import { DeleteConfirm } from "@/components/actions/del-novel-confirm";
import { ScrollArea } from "@/components/primitives/ui/scroll-area";
import { Spinner } from "@/components/primitives/ui/spinner";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { getNovelByConvert } from "@/services/user.service";
import { useActionStore } from "@/stores/use-action-store";
import { useKeywordStore } from "@/stores/use-keyword-store";
import { usePaginationStore } from "@/stores/use-pagination-store";
import { useTokenStore } from "@/stores/use-user-store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { lazy, Suspense } from "react";
import { toast } from "sonner";

// Lazy load the Manager component
const Manager = lazy(() => import("./manager"));

export default function Page() {
	// Retrieve necessary data from stores
	const { keyword } = useKeywordStore();
	const { pageIndex, pageSize, setTotalPage } = usePaginationStore();
	const { accessToken } = useTokenStore();
	const { action } = useActionStore();

	// Fetch novels data using react-query
	const {
		isPending,
		data,
		error,
		isError,
		isLoading: isLoadingNovels,
	} = useQuery({
		queryKey: [
			"getNovels",
			{ accessToken, limit: pageSize, page: pageIndex + 1, keyword },
		],
		queryFn: async ({ queryKey }) => {
			const [, { accessToken, limit, page, keyword }] = queryKey;
			const { data, meta } = await getNovelByConvert({
				accessToken,
				limit,
				page,
				keyword,
			});
			setTotalPage(meta.totalPage);
			return data;
		},
		placeholderData: keepPreviousData,
		enabled: !!accessToken,
		refetchOnWindowFocus: false,
	});

	// Handle errors
	if (isError) {
		toast.error("Đã có lỗi xảy ra, hãy thử lại sau", {
			description: error.message,
		});
	}

	const isLoading = isPending || isLoadingNovels;

	return (
		<ScrollArea className="h-full px-6">
			{action === "MANAGER" && (
				<Suspense fallback={<Spinner />}>
					<Manager />
				</Suspense>
			)}
			{!action && (
				<div className="p-6 bg-white rounded-xl">
					<DataTable columns={columns} data={data} isLoading={isLoading} />
					<DeleteConfirm />
				</div>
			)}
		</ScrollArea>
	);
}
