import prisma from "../config/prisma.js";

async function createGenre(name, description) {
	return await prisma.genres.create({
		data: {
			name: name,
			description: description,
		},
	});
}

async function getGenreById(id) {
	return await prisma.genres.findUnique({
		where: {
			id: id,
		},
		include: {
			novels: true,
		},
	});
}

async function getAllGenre() {
	return await prisma.genres.findMany();
}

async function updateGenreById(id, data) {
	return await prisma.genres.update({
		where: {
			id: id,
		},
		data: data,
	});
}

async function deleteGenreById(genreId) {
	const novelCount = await prisma.novels.count({
		where: {
			genreId: genreId,
		},
	});

	if (novelCount > 0) {
		return null;
	}

	return await prisma.genres.delete({
		where: { id: genreId },
	});
}

export {
	createGenre,
	getGenreById,
	getAllGenre,
	updateGenreById,
	deleteGenreById,
};
