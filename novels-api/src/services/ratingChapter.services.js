import prisma from "../config/prisma.js";
async function createChapterRating({ userId, chapterId, rate }) {
	const newRating = await prisma.ratingChapters.upsert({
		where: {
			ChapterRating: {
				userId: userId,
				chapterId: chapterId,
			},
		},
		update: {
			rate: rate,
		},
		create: {
			rate: rate,
			user: {
				connect: {
					id: userId,
				},
			},
			chapter: {
				connect: {
					id: chapterId,
				},
			},
		},
	});
	return newRating;
}

async function updateChapterRating(ratingId, rate) {
	return await prisma.ratingChapters.update({
		where: {
			id: ratingId,
		},
		data: {
			rate: rate,
		},
	});
}

async function deleteChapterRating({ userId, rateId }) {
	return await prisma.ratingChapters.delete({
		where: {
			id: rateId,
			userId: userId,
		},
	});
}

export { createChapterRating, deleteChapterRating, updateChapterRating };
