import { rankTabs } from "@/utils/common";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initializeOptions = () => {
  return {
    novel: rankTabs.novelTabs,
    converter: rankTabs.converterTabs,
  };
};

export const useRankTabStore = create(
  persist(
    (set) => ({
      tabs: initializeOptions(),
      setTab: (tabs) => set({ tabs }),
    }),
    {
      name: "rank-tabs", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
