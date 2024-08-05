import prisma from "../config/prisma.js";

async function createNotice({ title, content, type, userIds, chapterId }) {
	return await prisma.notifications.create({
		data: {
			title: title,
			content: content,
			type: type,
			targetUsers: {
				connect: userIds.map((id) => {
					return { id: id };
				}),
			},
			...(chapterId && {
				relationChapter: {
					connect: {
						id: chapterId,
					},
				},
			}),
		},
	});
}

async function updateNoticeStatus(noticeId, userId) {
	return await prisma.notifications.update({
		where: {
			id: noticeId,
		},
		data: {
			readBy: {
				connect: {
					id: userId,
				},
			},
		},
	});
}

async function updateAllNoticeStatus(userId) {
	return prisma.notifications.updateMany({
		where: {
			targetUsers: {
				some: {
					id: userId,
				},
			},
		},
		data: {
			readBy: {
				connect: {
					id: userId,
				},
			},
		},
	});
}

async function getNotice(userId, skip = 0, limit = 20) {
	return await prisma.notifications.findMany({
		where: {
			targetUsers: {
				some: {
					id: userId,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
		skip: skip,
		take: limit,
	});
}

async function deleteNotice(notificationId) {
	return await prisma.notifications.delete({
		where: {
			id: notificationId,
		},
	});
}

async function deleteUserNotices(userId) {
	return await prisma.notifications.deleteMany({
		where: {
			targetUsers: {
				some: {
					id: userId,
				},
			},
		},
	});
}

async function deleteNoticeById(noticeId) {
	return await prisma.notifications.delete({
		where: {
			id: noticeId,
		},
	});
}

export {
	createNotice,
	updateNoticeStatus,
	getNotice,
	deleteNotice,
	deleteUserNotices,
	deleteNoticeById,
	updateAllNoticeStatus,
};
