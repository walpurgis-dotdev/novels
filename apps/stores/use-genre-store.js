import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useGenreStore = create(
	persist(
		(set, get) => ({
			genres: [],
			setGenres: (genres) => set({ genres }),
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
			name: "genres",
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: () => (state) => {
				state.setHasHydrated(true);
			},
		},
	),
);
