"use client";

import { Card, CardHeader, CardTitle } from "@/components/primitives/ui/card";
import { useTagStore } from "@/stores/use-tag-store";
import { useSearchParams } from "next/navigation";
import { Badge } from "./primitives/ui/badge";
export function TagsFilter() {
	const currentSearchParams = useSearchParams();
	const { tags } = useTagStore();

	const selectedTagIds = currentSearchParams
		.getAll("tags")
		.flatMap((g) => g.split(","));

	const handleAddTag = (tagId) => {
		const newSearchParams = new URLSearchParams(currentSearchParams.toString());
		const tagIndex = selectedTagIds.indexOf(tagId.toString());
		if (tagIndex === -1) {
			selectedTagIds.push(tagId);
		} else {
			selectedTagIds.splice(tagIndex, 1);
		}
		if (selectedTagIds.length > 0) {
			newSearchParams.set("tags", selectedTagIds.join(","));
		} else {
			newSearchParams.delete("tags");
		}
		window.history.pushState(null, "", `?${newSearchParams.toString()}`);
	};
	return (
		<Card className="border-none shadow-none w-72 shrink-0 dark:ring-1 dark:ring-border rounded-xl">
			<CardHeader>
				<CardTitle className="text-base">Tag</CardTitle>
				<div className="flex flex-wrap gap-2">
					{tags.map((tag) => (
						<Badge
							key={tag.id}
							className="px-2 font-light cursor-pointer"
							variant={
								selectedTagIds.includes(tag.id.toString()) ? "" : "primary"
							}
							onClick={() => {
								handleAddTag(tag.id);
							}}
						>
							{tag.name}
						</Badge>
					))}
				</div>
			</CardHeader>
		</Card>
	);
}
