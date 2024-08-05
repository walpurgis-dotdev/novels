// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class CommentApiTransform {
	static transform(comment) {
		const { user, _count, likedBy, chapter } = comment;
		return {
			id: comment?.id,
			content: comment?.content,
			createdAt: comment?.createdAt,
			updatedAt: comment?.updatedAt,
			parentId: comment?.parentId,
			novelId: comment?.novelId,
			user: {
				id: user?.id,
				name: user?.name,
				avatar: user?.avatar,
				prefix: user?.prefix,
				level: user?.level,
			},
			_count: {
				childrens: _count?.childrens,
				likes: _count?.likedBy,
			},
			isLiked: likedBy
				? likedBy.some((item) => item.id === comment.userId)
				: false,
			chapter: {
				id: chapter?.id,
				title: chapter?.title,
				chapterNo: chapter?.chapterNo,
			},
		};
	}
}
export default CommentApiTransform;
