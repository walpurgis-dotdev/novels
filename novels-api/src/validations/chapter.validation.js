import vine, { SimpleMessagesProvider } from "@vinejs/vine";
import {
	CustomErrorReporter,
	customErrorMessage,
} from "./CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();
vine.messagesProvider = new SimpleMessagesProvider(customErrorMessage);

export const newChapterSchema = vine.object({
	novelId: vine.string().trim(),
	title: vine.string().maxLength(250).trim(),
	content: vine.string().trim(),
	chapterNo: vine.number(),
});

export const getChapterByNumberSchema = vine.object({
	novelId: vine.string().trim(),
	chapterNo: vine.number(),
});

export const updateChapterSchema = vine.object({
	chapterId: vine.string().trim(),
	title: vine.string().maxLength(250).trim().optional(),
	content: vine.string().trim().optional(),
	chapterNo: vine.number().optional(),
});

export const chapterRateSchema = vine.object({
	chapterId: vine.string().trim(),
	rate: vine.number().min(1).max(5).decimal([0, 1]),
	userId: vine.string().trim(),
});

export const deleteRateSchema = vine.object({
	rateId: vine.number(),
	userId: vine.string().trim(),
});

export const chapterReactionSchema = vine.object({
	type: vine.enum(["LIKE", "LOVE", "HAHA", "WOW", "SAD"]),
	userId: vine.string().trim(),
	chapterId: vine.string().trim(),
});

export const deleteReactionSchema = vine.object({
	reactionId: vine.string().trim(),
	userId: vine.string().trim(),
});
