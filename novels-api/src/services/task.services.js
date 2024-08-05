import prisma from "../config/prisma.js";

async function createTask(taskData, userId) {
	return await prisma.tasks.create({
		data: {
			...taskData,
			user: {
				connect: {
					id: userId,
				},
			},
		},
	});
}

async function updateTask(taskData, taskId) {
	return await prisma.tasks.update({
		where: {
			id: taskId,
		},
		data: {
			...taskData,
		},
	});
}

async function deleteTask(taskId) {
	return await prisma.tasks.delete({
		where: {
			id: taskId,
		},
	});
}

async function getTasks(userId, limit, offset) {
	return await prisma.tasks.findMany({
		where: {
			userId: userId,
		},
		orderBy: {
			createdAt: "desc",
		},
		take: limit,
		skip: offset,
	});
}

export { createTask, updateTask, deleteTask, getTasks };
