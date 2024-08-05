import prisma from "../config/prisma.js";
import { genNanoId } from "../utils/genNanoId.js";

async function getAllAuthors(skip = 0, SKIPLIMIT = 20) {
	const totalAuthors = await prisma.authors.count();
	const totalPages = Math.ceil(totalAuthors / SKIPLIMIT);

	const authors = await prisma.authors.findMany({
		skip: skip,
		take: SKIPLIMIT,
	});
	authors.totalPages = totalPages;
	return authors;
}
async function createAuthor({ name, originalName }) {
	return await prisma.authors.create({
		data: {
			id: genNanoId(),
			name: name,
			originalName: originalName,
		},
	});
}
// lấy thông tin Author và các novel thuộc Author đó
async function getAuthorById(authorId) {
	return await prisma.authors.findUnique({
		where: {
			id: authorId,
		},
		include: {
			novels: {
				select: {
					id: true,
					title: true,
					description: true,
					slug: true,
					nominate: true,
					covers: true,
					Genre: {
						select: {
							id: true,
							name: true,
							description: true,
						},
					},
					_count: {
						select: {
							chapters: true,
							views: true,
							Vote: true,
						},
					},
				},
			},
		},
	});
}

async function updateAuthorById(authorId, name, originalName) {
	return await prisma.authors.update({
		where: {
			id: authorId,
		},
		data: {
			name: name,
			originalName: originalName,
		},
	});
}

// Không thể xoá Author nếu có truyện thuộc Author đó
async function deleteAuthorById(authorId) {
	const authorLength = await prisma.authors.count({
		where: {
			id: authorId,
		},
	});

	if (authorLength?.length > 0) {
		return null;
	}

	return await prisma.authors.delete({
		where: { id: authorId },
	});
}

export {
	getAllAuthors,
	createAuthor,
	getAuthorById,
	updateAuthorById,
	deleteAuthorById,
};
