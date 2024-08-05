import prisma from "../config/prisma.js";
import countWords from "../utils/countWords.js";
async function checkOwner({ userId, novelId }) {
	return await prisma.novels.findFirst({
		where: {
			AND: {
				id: novelId,
				converterId: userId,
			},
		},
	});
}

async function getChapters({ novelId }) {
	return prisma.chapters.findMany({
		where: {
			novelId: novelId,
		},
		select: {
			id: true,
			title: true,
			chapterNo: true,
			createdAt: true,
		},
		orderBy: {
			chapterNo: "asc",
		},
	});
}

async function createChapter({ novelId, title, content, chapterNo }) {
	return await prisma.$transaction([
		prisma.chapters.create({
			data: {
				title: title,
				content: content,
				countWords: countWords(content),
				chapterNo: chapterNo,
				novel: {
					connect: {
						id: novelId,
					},
				},
			},
		}),
		prisma.novels.update({
			where: {
				id: novelId,
			},
			data: {
				updatedAt: new Date(),
			},
		}),
	]);
}

async function getChapterById({ chapterId, userId }) {
	const currentChapter = await prisma.chapters.findUnique({
		where: {
			id: chapterId,
		},
		include: {
			novel: {
				select: {
					id: true,
					slug: true,
					title: true,
					covers: true,
					Genre: {
						select: {
							id: true,
							name: true,
						},
					},
					Author: {
						select: {
							id: true,
							name: true,
						},
					},
					createdAt: true,
				},
			},
			...(userId && {
				reactions: {
					select: {
						userId: true,
						type: true,
					},
					where: {
						userId: userId,
						chapterId: chapterId,
					},
				},
			}),
			_count: {
				select: {
					reactions: true,
					comments: true,
				},
			},
		},
	});
	const [nextChapter, previousChapter] = await Promise.all([
		prisma.chapters.findFirst({
			where: {
				novelId: currentChapter.novelId,
				chapterNo: {
					gt: currentChapter.chapterNo,
				},
			},
			select: {
				id: true,
				chapterNo: true,
			},
			orderBy: {
				chapterNo: "asc",
			},
		}),
		prisma.chapters.findFirst({
			where: {
				novelId: currentChapter.novelId,
				chapterNo: {
					lt: currentChapter.chapterNo,
				},
			},
			select: {
				id: true,
				chapterNo: true,
			},
			orderBy: {
				chapterNo: "desc",
			},
		}),
	]);
	return {
		currentChapter,
		nextChapter,
		previousChapter,
	};
}

async function updateChapterById({ chapterId, ...chapterData }) {
	return await prisma.chapters.update({
		where: {
			id: chapterId,
		},
		data: chapterData,
	});
}

async function deleteChapterById(chapterId) {
	return await prisma.chapters.delete({
		where: {
			id: chapterId,
		},
	});
}

async function updateViews(chapterId) {
	return await prisma.chapters.update({
		where: {
			id: chapterId,
		},
		data: {
			views: {
				increment: 1,
			},
		},
	});
}

export {
	createChapter,
	getChapterById,
	updateChapterById,
	deleteChapterById,
	updateViews,
	checkOwner,
	getChapters,
};
