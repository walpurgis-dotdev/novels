import prisma from "../config/prisma.js";

async function getCommentsByNovelId(
	novelId,
	parentId = null,
	skip = 0,
	take = 20,
	userId,
) {
	const totalComments = await prisma.comments.count({
		where: {
			novelId: novelId,
			parentId: parentId,
		},
	});

	// Nếu không có comment hoặc skip vượt quá số lượng comment
	if (totalComments === 0 || skip >= totalComments) {
		return { comments: [], total: 0 };
	}
	const comments = await prisma.comments.findMany({
		where: {
			novelId: novelId,
			parentId: parentId,
		},
		include: {
			user: {
				select: {
					id: true,
					name: true,
					avatar: true,
					prefix: true,
					level: true,
				},
			},
			_count: {
				select: {
					childrens: true,
					likedBy: true,
				},
			},
			...(userId && {
				likedBy: {
					where: {
						id: userId,
					},
					select: {
						id: true,
					},
				},
			}),
			chapter: {
				select: {
					id: true,
					title: true,
					chapterNo: true,
				},
			},
		},
		skip: skip,
		take: take,
		orderBy: {
			createdAt: "desc",
		},
	});
	return {
		comments: comments,
		total: totalComments,
	};
}

async function createComment({
	novelId,
	chapterId = null,
	userId,
	parentId = null,
	content,
}) {
	return await prisma.comments.create({
		data: {
			content: content,
			novel: {
				connect: {
					id: novelId,
				},
			},
			chapter: chapterId
				? {
						connect: {
							id: chapterId,
						},
					}
				: null,
			user: {
				connect: {
					id: userId,
				},
			},
			...(parentId && {
				parent: {
					connect: {
						id: parentId,
					},
				},
			}),
		},
	});
}

async function deleteCommentById(commentId, userId) {
	return await prisma.comments.delete({
		where: {
			id: commentId,
			userId: userId,
		},
	});
}

async function likeComment(commentId, userId) {
	return await prisma.comments.upsert({
		where: {
			UserComment: {
				id: commentId,
				userId: userId,
			},
		},
		create: {
			likedBy: {
				connect: {
					id: userId,
				},
			},
		},
		update: {
			likedBy: {
				disconnect: {
					id: userId,
				},
			},
		},
	});
}

export { getCommentsByNovelId, createComment, deleteCommentById, likeComment };
