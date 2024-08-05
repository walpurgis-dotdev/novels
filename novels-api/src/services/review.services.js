import prisma from "../config/prisma.js";

async function createReview({ novelId, userId, ...data }) {
	return await prisma.reviews.upsert({
		create: {
			...data,
			reviewBy: {
				connect: {
					id: userId,
				},
			},
			novel: {
				connect: {
					id: novelId,
				},
			},
		},
		update: {
			...data,
		},
		where: {
			NovelReview: {
				novelId,
				userId,
			},
		},
	});
}

async function getReview(reviewId) {
	return await prisma.reviews.findUnique({
		where: {
			id: reviewId,
		},
	});
}

async function deleteReview(reviewId) {
	return await prisma.reviews.delete({
		where: {
			id: reviewId,
		},
	});
}

export { createReview, deleteReview, getReview };
