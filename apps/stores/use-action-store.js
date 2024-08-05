import { create } from "zustand";

export const useActionStore = create((set) => ({
	action: null,
	setAction: (action) => set({ action }),
	selectedNovel: null,
	setSelectedNovel: (selectedNovel) => set({ selectedNovel }),
}));
