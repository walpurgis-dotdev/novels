import vine, { SimpleMessagesProvider } from "@vinejs/vine";
import {
	CustomErrorReporter,
	customErrorMessage,
} from "./CustomErrorReporter.js";
vine.errorReporter = () => new CustomErrorReporter();
vine.messagesProvider = new SimpleMessagesProvider(customErrorMessage);

export const newNovelSchema = vine.object({
	title: vine.string().toLowerCase().minLength(5).trim().maxLength(255),
	description: vine.string().trim(),
	originalName: vine.string().trim(),
	originalLink: vine.string().url().trim(),
	genreId: vine.number().positive(),
	tagIds: vine.array(vine.number().positive()),
	authorName: vine.string().trim(),
	authorOriginalName: vine.string().trim(),
});

export const checkNovelSchema = vine.object({
	originalName: vine.string().trim(),
	originalLink: vine.string().url().trim(),
});

export const updateNovelSchema = vine.object({
	novelId: vine.string().trim(),
	title: vine
		.string()
		.toLowerCase()
		.minLength(5)
		.maxLength(255)
		.trim()
		.optional(),
	description: vine.string().trim().optional(),
	status: vine
		.string()
		.toUpperCase()
		.in(["ONGOING", "COMPLETED", "PAUSED"])
		.optional(),
	isPublished: vine.boolean().optional(),
	props: vine.string().toUpperCase().in(["CHATLUONGCAO", "CHONLOC"]).optional(),
	nominate: vine.boolean().optional(),
	genreId: vine.number().positive().optional(),
	tagIds: vine.array(vine.number().positive()).optional(),
});

export const publishSchema = vine.object({
	novelId: vine.string().trim(),
	userId: vine.string().trim(),
});

export const uploadCoverSchema = vine.object({
	novelId: vine.string().trim(),
	userId: vine.string().trim(),
});

export const queryNovelSchema = vine.object({
	keyword: vine.string().optional(),
	limit: vine.number().positive().optional(),
	page: vine.number().positive().optional(),
	sort_by: vine
		.string()
		.in([
			"status",
			"createdAt",
			"newChapAt",
			"viewDay",
			"viewWeek",
			"viewMonth",
			"viewAll",
			"reviewCount",
			"favoriteCount",
			"flowerCount",
			"commentCount",
			"chapterCount",
		])
		.optional(),
	sort_type: vine.string().in(["ASC", "DESC"]).optional(),
	status: vine.string().in(["ONGOING", "COMPLETED", "PAUSED"]).optional(),
	props: vine
		.string()
		.in(["CHATLUONGCAO", "CHONLOC", "MIENPHI", "TRAPHI"])
		.optional(),
	tags: vine.array(vine.number().positive()).optional(),
	genres: vine.array(vine.number().positive()).optional(),
	nominate: vine.boolean().optional(),
});
