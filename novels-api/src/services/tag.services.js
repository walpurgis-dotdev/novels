import prisma from "../config/prisma.js";

async function createTag(data) {
	// data = { name: "tag name", type: "CHARACTER/WORLD/FACTION/SIGHT" }
	const newTag = await prisma.tags.create({
		data: data,
	});
	return newTag;
}
// lấy thông tin tag và các novel thuộc tag đó
async function getTagById(id) {
	return await prisma.tags.findUnique({
		where: {
			id: id,
		},
		include: {
			novels: true,
		},
	});
}

async function updateTagById(id, data) {
	return await prisma.tags.update({
		where: {
			id: id,
		},
		data: data,
	});
}

// Không thể xoá tag nếu có truyện thuộc tag đó
async function deleteTagById(tagId) {
	const novelCount = await prisma.novels.count({
		where: {
			tags: {
				some: {
					id: tagId,
				},
			},
		},
	});

	if (novelCount > 0) {
		return null;
	}

	const tag = await prisma.tags.delete({
		where: { id: tagId },
	});
	return tag;
}

async function getAllTags() {
	const tags = await prisma.tags.findMany();
	return tags;
}
export { createTag, getTagById, updateTagById, deleteTagById, getAllTags };
