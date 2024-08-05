import prisma from "../config/prisma.js";

async function createReaction({ userId, chapterId, type }) {
	return await prisma.reactions.upsert({
		where: {
			UserChapterReaction: {
				userId: userId,
				chapterId: chapterId,
			},
		},
		update: {
			type: type,
		},
		create: {
			type: type,
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
}

async function deleteReactionById(reactionId, userId) {
	return await prisma.reactions.delete({
		where: {
			id: reactionId,
			userId: userId,
		},
	});
}

export { createReaction, deleteReactionById };
