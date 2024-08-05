import prisma from "../config/prisma.js";

async function createVote({ userId, novelId, flowers }) {
	// kiểm tra số hoa của người dùng
	const user = await prisma.users.findUnique({
		where: {
			id: userId,
		},
	});
	if (user.flowers < flowers) {
		return null;
	}
	return await prisma.$transaction([
		prisma.users.update({
			data: {
				flowers: {
					decrement: flowers,
				},
			},
			where: {
				id: userId,
			},
		}),
		prisma.votes.create({
			data: {
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
				amount,
			},
		}),
	]);
}

async function getvoteById(voteId) {
	return await prisma.votes.findUnique({
		where: {
			id: voteId,
		},
	});
}

export { createVote, getvoteById };
