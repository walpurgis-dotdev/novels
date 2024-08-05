import vine, { SimpleMessagesProvider } from "@vinejs/vine";
import {
   CustomErrorReporter,
   customErrorMessage,
} from "./CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();
vine.messagesProvider = new SimpleMessagesProvider(customErrorMessage);

export const getCommentsSchema = vine.object({
   novelId: vine.string().trim(),
   parentId: vine.string().trim().optional(),
   page: vine.number().min(1).positive(),
});

export const newCommentSchema = vine.object({
   novelId: vine.string().trim(),
   chapterId: vine.string().trim().optional(),
   userId: vine.string().trim(),
   parentId: vine.string().trim().optional(),
   content: vine.string().trim().minLength(1).maxLength(5000),
});

export const commentIdSchema = vine.object({
   commentId: vine.string().trim(),
   userId: vine.string().trim(),
});
