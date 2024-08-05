import prisma from "../config/prisma.js";

async function addMoney(userId, amount, paymentFrom) {
	return await prisma.$transaction([
		prisma.users.update({
			where: {
				id: userId,
			},
			data: {
				money: {
					increment: amount,
				},
			},
		}),
		prisma.payments.create({
			data: {
				amount,
				user: {
					connect: {
						id: userId,
					},
				},
				paymentFrom,
			},
		}),
	]);
}

async function createDonation({ amount, userId, novelId }) {
	// kiểm tra số dư người dùng
	const user = await prisma.users.findUnique({
		where: {
			id: userId,
		},
	});

	if (user.money < amount) {
		return null;
	}

	return await prisma.$transaction([
		prisma.users.update({
			where: {
				id: userId,
			},
			data: {
				money: {
					decrement: amount,
				},
			},
		}),
		prisma.donations.create({
			data: {
				amount,
				novel: {
					connect: {
						id: novelId,
					},
				},
				user: {
					connect: {
						id: userId,
					},
				},
			},
		}),
	]);
}

async function getDonationById(donationId) {
	return await prisma.donations.findUnique({
		where: {
			id: donationId,
		},
	});
}

export { addMoney, createDonation, getDonationById };
