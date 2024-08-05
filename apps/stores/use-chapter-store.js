import { create } from "zustand";

export const useChapterStore = create((set) => ({
  chapter: null,
  setChapter: (chapter) => set({ chapter }),
}));
