import prisma from "../config/prisma.js";

async function createHistory(userId, novelId, chapterId) {
	return await prisma.history.upsert({
		where: {
			UserNovelChapter: {
				userId: userId,
				novelId: novelId,
				chapterId: chapterId,
			},
		},
		create: {
			user: {
				connect: {
					id: userId,
				},
			},
			novel: {
				connect: {
					id: novelId,
				},
			},
			chapter: {
				connect: {
					id: chapterId,
				},
			},
		},
		update: {
			chapter: {
				connect: {
					id: chapterId,
				},
			},
		},
	});
}

async function getHistory(userId, limit, skip) {
	return await prisma.history.findMany({
		where: {
			userId: userId,
		},
		include: {
			novel: true,
			chapter: true,
		},
		take: limit,
		skip: skip,
	});
}

async function deleteHistory(historyId) {
	return await prisma.history.delete({
		where: {
			id: historyId,
		},
	});
}

export { createHistory, getHistory, deleteHistory };
