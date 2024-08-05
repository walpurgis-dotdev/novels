// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class ChapterApiTransform {
	static transform(chapter) {
		const { novel, reactions, _count, nextChapter, previousChapter } = chapter;
		const genre = novel?.Genre;
		const author = novel?.Author;
		return {
			id: chapter?.id,
			title: chapter?.title,
			content: chapter?.content,
			chapterNo: chapter?.chapterNo,
			createdAt: chapter?.createdAt,
			novel: novel
				? {
						id: novel?.id,
						title: novel?.title,
						slug: novel?.slug,
						covers: novel?.covers,
						createdAt: novel?.createdAt,
					}
				: null,
			genre: genre,
			author: author,
			isReacted: !!reactions,
			reactions: reactions,
			_count: _count,
			nextChapter: nextChapter
				? {
						id: nextChapter?.id,
						chapterNo: nextChapter?.chapterNo,
					}
				: null,
			previousChapter: previousChapter
				? {
						id: previousChapter?.id,
						chapterNo: previousChapter?.chapterNo,
					}
				: null,
		};
	}
}

export default ChapterApiTransform;
