import { BaseChapter } from "@/components/novels/chapters/base-chapter";
import { BaseShell } from "@/components/wrappers/base-shell";
import { getChapterById } from "@/services/novel.service";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
	const chapterId = params.chapterNo?.split("-")?.pop();
	const chapterFetched = await getChapterById(chapterId);
	if (!chapterFetched.ok) {
		notFound();
	}
	const chapter = chapterFetched.data;
	return (
		<BaseShell>
			<BaseChapter chapter={chapter} />
		</BaseShell>
	);
}
