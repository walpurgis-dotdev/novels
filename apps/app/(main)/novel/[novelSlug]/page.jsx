import { AuthorsNovel } from "@/components/novels/details/authors-novel";
import { ConverterNovels } from "@/components/novels/details/converter-novels";
import { ListOfContents } from "@/components/novels/details/list-of-contents";
import { NovelInf } from "@/components/novels/details/novel-inf";
import { OtherRecommendedNovels } from "@/components/novels/details/other-recommended-novels";
import { PersonalInf } from "@/components/novels/details/personal-inf";
import { SimilarRecommendations } from "@/components/novels/details/similar-recommendations";
import { StoryLine } from "@/components/novels/details/story-line";
import { WorksHonor } from "@/components/novels/details/works-honor";
import { Shell } from "@/components/wrappers/shell-variants";
import { getChapterByNovelId } from "@/services/chapter.service";
import { getNovelBySlugOrId, getNovels } from "@/services/novel.service";
import { getUserById } from "@/services/user.service";
import { honors } from "@/utils/common";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
	const novelsFetch = await getNovelBySlugOrId(params.novelSlug);
	if (!novelsFetch.ok) {
		notFound();
	}
	const novels = novelsFetch.data; // Get novel by slug
	const user = await getUserById(novels.converterId); // Get user by converterId
	const chapters = await getChapterByNovelId(novels.id); // Get all chapters []
	const g_novels = await getNovels({}); // Get all novels []
	const all_novels = g_novels?.data; // Get all novels [] from g_novels
	const novels_by_converterId = all_novels
		.filter((item) => item.converterId === novels.converterId)
		.slice(0, 3); // Get novels by converterId []
	const novels_by_authorId = all_novels
		.filter((item) => item.author.id === novels.author.id)
		.slice(0, 3); // Get novels by authorId []
	const recommended_novels = all_novels
		.filter((item) => item.id !== novels.id)
		.slice(0, 6); // Get recommended novels []
	const first_chapter = chapters.sort((a, b) => a.chapterNo - b.chapterNo)[0]; // Get first chapter
	const latest_chapter = chapters.sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
	)[0]; // Get latest chapter

	return (
		<Shell as="div" className="w-full px-3 py-0 mt-20 xl:px-0 md:py-0">
			<section className="flex gap-x-4">
				<NovelInf
					detail={novels}
					first_chapter={{
						no: first_chapter?.chapterNo,
						id: first_chapter?.id,
					}}
					latest_chapter={{
						no: latest_chapter?.chapterNo,
						id: latest_chapter?.id,
						title: latest_chapter?.title,
					}}
				/>
				<PersonalInf user={user} />
			</section>
			<section className="flex items-start w-[inherit] gap-x-4">
				<div className="flex-grow space-y-4">
					<StoryLine detail={novels} />
					{chapters.length > 0 && (
						<ListOfContents chapters={chapters} slug={novels.slug} />
					)}
					<SimilarRecommendations data={all_novels} novels={novels} />
				</div>
				<div className="space-y-4 w-72 shrink-0">
					<WorksHonor honor={honors} />
					<AuthorsNovel data={novels_by_authorId} />
					<ConverterNovels data={novels_by_converterId} user={user} />
					<OtherRecommendedNovels data={recommended_novels} />
				</div>
			</section>
		</Shell>
	);
}
