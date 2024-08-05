import prisma from "../config/prisma.js";

async function createUser(userData) {
	return await prisma.users.create({
		data: userData,
	});
}

async function getUserByEmail(email) {
	return await prisma.users.findUnique({
		where: {
			email: email,
		},
	});
}

async function getUserById(id) {
	const user = await prisma.users.findUnique({
		where: {
			id: id,
		},
		include: {
			level: true,
			_count: {
				select: {
					comments: true,
					Votes: true,
					convertedNovels: true,
					reactions: true,
					likedNovels: true,
					reviewNovels: true,
				},
			},
			history: {
				select: {
					id: true,
					novel: {
						select: {
							id: true,
							slug: true,
							title: true,
							description: true,
							Author: {
								select: {
									id: true,
									name: true,
								},
							},
							covers: true,
						},
					},
				},
				orderBy: {
					createdAt: "desc",
				},
				take: 10,
			},
		},
	});
	const currentLevel = user.level;
	let nextLevel = null;
	if (currentLevel) {
		nextLevel = await prisma.levels.findFirst({
			where: {
				pointRequire: {
					gt: currentLevel?.pointRequire,
				},
			},
			orderBy: {
				pointRequire: "asc",
			},
		});
	}

	return {
		...user,
		nextLevel: nextLevel,
	};
}

async function getAccessDetails(userId) {
	return await prisma.users.findUnique({
		where: {
			id: userId,
		},
		select: {
			id: true,
			role: true,
			permissions: true,
		},
	});
}

async function getProfile(id) {
	const user = await prisma.users.findUnique({
		where: {
			id: id,
		},
		include: {
			level: true,
		},
	});
	const currentLevel = user.level;
	let nextLevel = null;
	if (currentLevel) {
		nextLevel = await prisma.levels.findFirst({
			where: {
				pointRequire: {
					gt: currentLevel?.pointRequire,
				},
			},
			orderBy: {
				pointRequire: "asc",
			},
		});
	}

	return {
		...user,
		nextLevel: nextLevel,
	};
}

async function updateUserById(id, data) {
	return await prisma.users.update({
		where: {
			id: id,
		},
		data: data,
		include: {
			level: true,
		},
	});
}

async function verifyUserEmail(email) {
	return await prisma.users.update({
		where: {
			email: email,
		},
		data: {
			isVerified: true,
		},
	});
}

async function blockUserById(id) {
	return await prisma.users.update({
		where: {
			id: id,
		},
		data: {
			isBlocked: true,
		},
	});
}

async function getNovelsByUserId({
	userId,
	keyword,
	limit = 10,
	page = 1,
	sort_by = "createdAt",
	sort_type = "desc",
}) {
	const [novels, meta] = await prisma.novels
		.paginate({
			where: {
				converterId: userId,
				...(keyword && {
					title: {
						search: keyword,
					},
				}),
			},
			include: {
				Author: true,
				tags: true,
			},
			orderBy: {
				[sort_by]: sort_type,
			},
		})
		.withPages({
			limit: limit || 10,
			page: page || 1,
			includePageCount: true,
		});
	return {
		novels,
		meta,
	};
}

async function getPermissionsByUserId(userId) {
	return await prisma.users.findUnique({
		where: {
			id: userId,
		},
		select: {
			permissions: true,
		},
	});
}

async function upgradeRole(userId) {
	return await prisma.users.update({
		where: {
			id: userId,
		},
		data: {
			role: "CREATOR",
		},
	});
}

async function getUserRole(userId) {
	return await prisma.users.findUnique({
		where: {
			id: userId,
		},
		select: {
			role: true,
			createdAt: true,
			isVerified: true,
		},
	});
}

export {
	createUser,
	getUserByEmail,
	getUserById,
	updateUserById,
	getNovelsByUserId,
	getPermissionsByUserId,
	getProfile,
	verifyUserEmail,
	blockUserById,
	getAccessDetails,
	upgradeRole,
	getUserRole,
};
