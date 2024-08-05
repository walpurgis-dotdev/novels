import vine, { SimpleMessagesProvider } from "@vinejs/vine";
import {
   CustomErrorReporter,
   customErrorMessage,
} from "./CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();
vine.messagesProvider = new SimpleMessagesProvider(customErrorMessage);

export const newNoticeSchema = vine.object({
   title: vine.string().minLength(3).maxLength(250).trim(),
   content: vine.string().minLength(3).maxLength(250).trim(),
   type: vine.enum(["ADMINMESSAGE", "NEWCHAPTER", "SYSTEMMESSAGE"]),
   userIds: vine.array(vine.string().trim()),
   chapterId: vine.string().trim().optional(),
});

export const readedNoticeSchema = vine.object({
   id: vine.string().trim(),
   userId: vine.string().trim(),
});
