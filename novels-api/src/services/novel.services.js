import prisma from "../config/prisma.js";
import slugify from "../utils/slugify.js";

async function createNovel({
	title,
	genreId,
	tagIds,
	authorName,
	authorOriginalName,
	userId,
	...novelData
}) {
	return await prisma.novels.create({
		data: {
			title,
			slug: slugify(title),
			...novelData,
			Author: {
				connectOrCreate: {
					where: {
						AuthorNameOriginalName: {
							name: authorName,
							originalName: authorOriginalName,
						},
					},
					create: {
						name: authorName,
						originalName: authorOriginalName,
					},
				},
			},
			converter: {
				connect: {
					id: userId,
				},
			},
			Genre: {
				connect: {
					id: genreId,
				},
			},
			tags: {
				connect: tagIds.map((tagId) => ({ id: tagId })),
			},
		},
	});
}

async function getNovelByIdAndConvertId({ novelId, userId }) {
	return await prisma.novels.findUnique({
		where: {
			id: novelId,
			converterId: userId,
		},
		include: {
			chapters: {
				select: {
					id: true,
					chapterNo: true,
				},
				orderBy: {
					chapterNo: "asc",
				},
				take: 1,
			},
		},
	});
}

async function getNovelByIdOrSlug(IdOrSlug) {
	const novel = await prisma.novels.findFirst({
		where: {
			isPublished: true,
			OR: [
				{
					id: IdOrSlug,
				},
				{
					slug: IdOrSlug,
				},
			],
		},
		include: {
			Author: true,
			Genre: true,
			tags: true,
			_count: {
				select: {
					comments: true,
					reviews: true,
					favoriteBy: true,
					chapters: true,
				},
			},
		},
	});

	if (novel) {
		const sum = await prisma.chapters.aggregate({
			where: {
				novelId: novel.id,
			},
			_sum: {
				countWords: true,
			},
		});
		const views = await prisma.views.aggregate({
			where: {
				novelId: novel.id,
			},
			_sum: {
				views: true,
			},
		});
		novel.words = sum?._sum?.countWords || 0;
		novel.views = views?._sum?.views || 0;
	}
	return novel;
}

// Hàm lấy ra novel dựa vào thời gian thêm novels đó
async function getNews(skip = 0, SKIPLIMIT = 10) {
	const query = {
		select: {
			Author: true,
			Genres: true,
			converter: {
				select: {
					id: true,
					username: true,
					avatar: true,
				},
			},
			chapters: {
				take: 1,
				orderBy: {
					createdAt: "desc",
				},
				select: {
					id: true,
					title: true,
					createdAt: true,
					updatedAt: true,
				},
			},
			_count: {
				select: {
					chapters: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
		skip: skip,
		take: SKIPLIMIT,
		where: {
			isPublished: true,
		},
	};
	const [novels, totalNovels] = await prisma.$transaction([
		prisma.novels.findMany(query),
		prisma.novels.count({
			where: query.where,
		}),
	]);
	novels.total = totalNovels;
	return novels;
}
const orderByMap = {
	createdAt: { createdAt: "desc" },
	newChapAt: { updatedAt: "desc" },
	viewDay: { views: { _count: "desc" } },
	viewWeek: { views: { _count: "desc" } },
	viewMonth: { views: { _count: "desc" } },
	viewAll: { views: { _count: "desc" } },
	reviewCount: { reviews: { _count: "desc" } },
	favoriteCount: { favoriteBy: { _count: "desc" } },
	flowerCount: { Vote: { _count: "desc" } },
	commentCount: { comments: { _count: "desc" } },
	chapterCount: { chapters: { _count: "desc" } },
};
function generateOrderBy(sortBy) {
	return orderByMap[sortBy] || orderByMap.createdAt;
}

function getViewFilter(sortBy, dates) {
	if (["viewDay", "viewWeek", "viewMonth"].includes(sortBy)) {
		return {
			views: {
				some: {
					createdAt: {
						gte: dates[sortBy],
					},
				},
			},
		};
	}
	return {};
}
// Hàm lấy ra novel với chapter mới cập nhật
async function getLatestNovels(
	limit = 10,
	page = 1,
	query = {
		sort_by: "newChapAt",
	},
) {
	const dates = {
		viewDay: new Date(new Date().setDate(new Date().getDate() - 1)),
		viewWeek: new Date(new Date().setDate(new Date().getDate() - 7)),
		viewMonth: new Date(new Date().setMonth(new Date().getMonth() - 1)),
	};
	const where = {
		isPublished: true,
		...(query.keyword && {
			title: {
				search: query.keyword,
			},
		}),
		...(query.status && {
			status: query.status,
		}),
		...(query.props && {
			props: query.props,
		}),
		...(query.tags && {
			tags: {
				some: {
					id: {
						in: query.tags,
					},
				},
			},
		}),
		...(query.genres && {
			Genre: {
				id: {
					in: query.genres,
				},
			},
		}),
		...(query.nominate && {
			nominate: query.nominate,
		}),
		...getViewFilter(query.sort_by, dates),
	};
	const orderBy = generateOrderBy(query.sort_by);

	const [novels, meta] = await prisma.novels
		.paginate({
			where,
			orderBy,
			include: {
				_count: {
					select: {
						chapters: true,
					},
				},
				converter: true,
				Genre: true,
				Author: true,
			},
		})
		.withPages({
			limit: limit,
			page: page,
			includePageCount: true,
		});
	return {
		novels,
		meta,
	};
}

// Hàm lấy ra 10 Novel được xem nhiều nhất trong tuần qua
async function get10MostViewedNovelsInWeek() {
	return await prisma.novels.findMany({
		include: {
			converter: {
				select: {
					id: true,
					username: true,
				},
			},
			Genre: {
				select: {
					id: true,
					name: true,
				},
			},
			NovelView: {
				select: {
					id: true,
				},
				where: {
					createdAt: {
						gte: new Date(new Date().setDate(new Date().getDate() - 7)),
					},
				},
			},
			_count: {
				select: {
					NovelView: true,
				},
			},
		},

		orderBy: {
			NovelView: {
				_count: "desc",
			},
		},
		take: 10,
	});
}

// Hàm lấy ra 10 Novel có đề cử hoa nhiều nhất trong tuần qua
async function getTop10NovelsByFlowers() {
	return await prisma.novels.findMany({
		where: {
			donateFlower: {
				some: {
					createdAt: {
						gte: new Date(new Date().setDate(new Date().getDate() - 7)),
					},
				},
			},
		},
		// Tính tổng số lượng hoa đề cử cho mỗi Novel
		include: {
			_count: {
				select: {
					donateFlower: true,
				},
			},
		},
		take: 10,
		orderBy: {
			donateFlower: {
				_count: "desc",
			},
		},
	});
}

async function updateNovel({ novelId, ...data }) {
	return await prisma.novels.update({
		where: {
			id: novelId,
		},
		data: {
			...data,
		},
	});
}

async function publishNovel({ novelId, userId }) {
	return await prisma.novels.update({
		where: {
			id: novelId,
		},
		data: {
			isPublished: true,
			approvedBy: {
				connect: {
					id: userId,
				},
			},
		},
	});
}

async function deleteNovelById(novelId) {
	return await prisma.novels.delete({
		where: {
			id: novelId,
		},
	});
}

async function updateNovelTags(novelId, tagIds) {
	return await prisma.novels.update({
		where: {
			id: novelId,
		},
		data: {
			tags: {
				connect: tagIds.map((tagId) => ({ id: tagId })),
			},
		},
	});
}

async function checkExist({ originalName, originalLink }) {
	return await prisma.novels.findFirst({
		where: {
			OR: [
				{
					originalName,
				},
				{
					originalLink,
				},
			],
		},
	});
}

export {
	createNovel,
	getNovelByIdOrSlug,
	getLatestNovels,
	get10MostViewedNovelsInWeek,
	getTop10NovelsByFlowers,
	updateNovel,
	deleteNovelById,
	updateNovelTags,
	publishNovel,
	getNovelByIdAndConvertId,
	getNews,
	checkExist,
};
