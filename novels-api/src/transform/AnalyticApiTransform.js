// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class AnalyticApiTransform {
	static transform(data) {
		const [chapter, novel] = data;
		return {
			id: novel.id,
			chapterCount: chapter._count,
			viewsCount: novel._count.views,
			commentsCount: novel._count.comments,
			favoriteCount: novel._count.favoriteBy,
			voteCount: novel._count.Vote,
			sumWords: chapter._sum.countWords,
		};
	}
}

export default AnalyticApiTransform;
