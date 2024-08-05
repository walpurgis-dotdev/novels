"use client";

import { getAllGenres } from "@/services/genre.service";
import { getAllTags } from "@/services/tag.service";
import { useGenreStore } from "@/stores/use-genre-store";
import { useTagStore } from "@/stores/use-tag-store";
import { isToday } from "@/utils/is-today";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function DataProvider({ children }) {
	const {
		genres,
		setGenres,
		setLastUpdated,
		lastUpdated,
		_hasHydrated: genreHydrated,
	} = useGenreStore();
	const {
		tags,
		setTags,
		lastUpdated: tagUpdate,
		setLastUpdated: setTagUpdate,
		_hasHydrated: tagHydrated,
	} = useTagStore();

	const genreResult = useQuery({
		queryKey: "genres",
		queryFn: async () => {
			const result = await getAllGenres();
			if (result.ok) {
				setGenres(result.data);
				setLastUpdated(new Date());
				return result.data;
			}
			toast.error("Có lỗi xảy ra khi tải dữ liệu thể loại", {
				duration: 3000,
			});
		},
		enabled: genreHydrated && !isToday(lastUpdated) && genres.length === 0,
		refetchOnWindowFocus: false,
		gcTime: 1000 * 60 * 60 * 24,
	});

	const tagResult = useQuery({
		queryKey: "tags",
		queryFn: async () => {
			const result = await getAllTags();
			if (result.ok) {
				setTags(result?.data);
				setTagUpdate(new Date());
				return result?.data;
			}
			toast.error("Có lỗi xảy ra khi tải dữ liệu tags", {
				duration: 3000,
			});
		},
		enabled: tagHydrated && !isToday(tagUpdate) && tags.length === 0,
		refetchOnWindowFocus: false,
		gcTime: 1000 * 60 * 60 * 24,
	});

	return <div>{children}</div>;
}
