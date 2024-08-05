import prisma from "../config/prisma.js";

async function createNovelView(novelId) {
	return await prisma.views.create({
		data: {
			novel: {
				connect: {
					id: novelId,
				},
			},
		},
	});
}

async function createChapterView(novelId, chapterId) {
	return await prisma.views.create({
		data: {
			chapter: {
				connect: {
					id: chapterId,
				},
			},
			novel: {
				connect: {
					id: novelId,
				},
			},
		},
	});
}

async function deleteChapterView(chapterId) {
	return await prisma.views.delete({
		where: {
			chapterId: chapterId,
		},
	});
}

async function deleteNovelView(novelId) {
	return await prisma.views.delete({
		where: {
			novelId: novelId,
		},
	});
}

export {
	createNovelView,
	deleteNovelView,
	createChapterView,
	deleteChapterView,
};
