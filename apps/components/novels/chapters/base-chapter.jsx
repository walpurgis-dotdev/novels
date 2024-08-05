"use client";

import { SubComment } from "@/components/novels/chapters/subs/sub-comment";
import { SubMain } from "@/components/novels/chapters/subs/sub-main";
import { OptionalControls } from "@/components/optional-controls";
import { Shell } from "@/components/wrappers/shell-variants";
import { getCommentByNovelId } from "@/services/comment.service";
import { useChapterStore } from "@/stores/use-chapter-store";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";

export function BaseChapter({ chapter }) {
	const [isOpen, setIsOpen] = React.useState(false);
	const { setChapter } = useChapterStore();

	// Get comments by novelId
	const { data, isPending, isLoading, isFetching } = useQuery({
		queryKey: ["getComments", { novelId: chapter?.novel?.id }],
		queryFn: async ({ queryKey }) => {
			const [, { novelId }] = queryKey;
			const result = await getCommentByNovelId(novelId);
			return result;
		},
		enabled: !!isOpen,
		refetchOnWindowFocus: false,
	});

	const isCommentsLoading = isPending || isLoading || isFetching;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		setChapter({
			chapterId: chapter.id,
			novelId: chapter.novel.id,
		});
	}, [chapter]);
	return (
		<>
			<Shell
				as="div"
				className="relative inline-flex items-start justify-start py-0 md:py-0"
			>
				<SubMain
					chapter={chapter}
					handleClick={() => {
						setIsOpen((prev) => !prev);
					}}
				/>
				{isOpen && (
					<SubComment
						comments={data}
						setIsOpen={setIsOpen}
						isLoading={isCommentsLoading}
					/>
				)}
				<OptionalControls chapter={chapter} />
			</Shell>
		</>
	);
}
