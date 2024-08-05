"use client";

import { Card, CardHeader, CardTitle } from "@/components/primitives/ui/card";
import { useGenreStore } from "@/stores/use-genre-store";
import { useSearchParams } from "next/navigation";
import { Badge } from "./primitives/ui/badge";
export function GenresFilter() {
	const currentSearchParams = useSearchParams();
	const { genres } = useGenreStore();

	const selectedGenreIds = currentSearchParams
		.getAll("genres")
		.flatMap((g) => g.split(","));

	const handleAddGenre = (genreId) => {
		const newSearchParams = new URLSearchParams(currentSearchParams.toString());
		const genreIndex = selectedGenreIds.indexOf(genreId.toString());
		if (genreIndex === -1) {
			selectedGenreIds.push(genreId);
		} else {
			selectedGenreIds.splice(genreIndex, 1);
		}
		if (selectedGenreIds.length > 0) {
			newSearchParams.set("genres", selectedGenreIds.join(","));
		} else {
			newSearchParams.delete("genres");
		}
		window.history.pushState(null, "", `?${newSearchParams.toString()}`);
	};
	return (
		<Card className="border-none shadow-none w-72 shrink-0 dark:ring-1 dark:ring-border rounded-xl">
			<CardHeader>
				<CardTitle className="text-base">Thể loại</CardTitle>
				<div className="flex flex-wrap gap-2">
					{genres.map((genre) => (
						<Badge
							key={genre.id}
							className="px-2 font-light cursor-pointer"
							variant={
								selectedGenreIds.includes(genre.id.toString()) ? "" : "primary"
							}
							onClick={() => {
								handleAddGenre(genre.id);
							}}
						>
							{genre.name}
						</Badge>
					))}
				</div>
			</CardHeader>
		</Card>
	);
}
