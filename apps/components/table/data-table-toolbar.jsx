"use client";

import { Button } from "@/components/primitives/ui/button";
import { Input } from "@/components/primitives/ui/input";
import { priorities, statuses } from "@/data/data";
import { useDebounce } from "@/hooks/use-debounce";
import { useKeywordStore } from "@/stores/use-keyword-store";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

export function DataTableToolbar({ table }) {
	const [q, setQ] = useState("");
	const { setKeyword } = useKeywordStore();
	const isFiltered = table.getState().columnFilters.length > 0;
	const debouncedQ = useDebounce(q, 500);

	useEffect(() => {
		setKeyword(debouncedQ);
	}, [debouncedQ, setKeyword]);
	return (
		<div className="flex items-center justify-between ">
			<div className="flex items-center flex-1 space-x-2">
				<Input
					placeholder="Tìm kiếm tên tác phẩm..."
					value={q}
					onChange={(event) => setQ(event.target.value)}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{table.getColumn("status") && (
					<DataTableFacetedFilter
						column={table.getColumn("status")}
						title="Status"
						options={statuses}
					/>
				)}

				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => {
							setQ("");
						}}
						className="h-8 px-2 lg:px-3"
					>
						đặt lại
						<Cross2Icon className="w-4 h-4 ml-2" />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
}
