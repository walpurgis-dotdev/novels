import { create } from "zustand";

export const useDelNovelStore = create((set) => ({
	isOpen: false,
	open: () => set({ isOpen: true }),
	close: () => set({ isOpen: false }),
	novel: null,
	setNovel: (novel) => set({ novel }),
}));
