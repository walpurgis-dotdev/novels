import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useTagStore = create(
	persist(
		(set) => ({
			tags: [],
			setTags: (tags) => set({ tags }),
			lastUpdated: null,
			setLastUpdated: (lastUpdated) => set({ lastUpdated }),
			_hasHydrated: false,
			setHasHydrated: (state) => {
				set({
					_hasHydrated: state,
				});
			},
		}),
		{
			name: "tags",
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: () => (state) => {
				state.setHasHydrated(true);
			},
		},
	),
);
