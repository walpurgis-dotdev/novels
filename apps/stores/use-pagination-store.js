import { create } from "zustand";

export const usePaginationStore = create(
	(set) => ({
		pageIndex: 0,
		pageSize: 10,
		totalPage: 1,
		setPageIndex: (pageIndex) => set({ pageIndex }),
		setPageSize: (pageSize) => set({ pageSize }),
		setTotalPage: (totalPage) => set({ totalPage }),
	}),
	{
		name: "usePaginationStore",
	},
);
