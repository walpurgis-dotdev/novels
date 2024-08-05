import prisma from "../config/prisma.js";
async function analyticNovel(novelId) {
	const result = await prisma.$transaction([
		prisma.chapters.aggregate({
			where: {
				novelId: novelId,
			},
			_sum: {
				countWords: true,
			},
			_count: true,
		}),
		prisma.novels.findUnique({
			where: {
				id: novelId,
			},
			select: {
				id: true,
				_count: {
					select: {
						comments: true,
						favoriteBy: true,
						views: true,
						Vote: true,
					},
				},
			},
		}),
	]);

	return result;
}
export { analyticNovel };
