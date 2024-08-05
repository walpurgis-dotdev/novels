import { create } from "zustand";

export const useKeywordStore = create((set) => ({
	keyword: "",
	setKeyword: (q) => set({ keyword: q }),
	clearKeyword: () => set({ keyword: "" }),
}));
