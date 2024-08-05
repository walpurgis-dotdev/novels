import vine, { SimpleMessagesProvider } from "@vinejs/vine";
import {
   CustomErrorReporter,
   customErrorMessage,
} from "./CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();
vine.messagesProvider = new SimpleMessagesProvider(customErrorMessage);

export const newAuthorSchema = vine.object({
   name: vine.string().minLength(3).maxLength(250).trim(),
   originalName: vine.string().minLength(3).maxLength(250).trim(),
});

export const updateAuthorSchema = vine.object({
   name: vine.string().minLength(3).maxLength(250).trim().optional(),
   originalName: vine.string().minLength(3).maxLength(250).trim().optional(),
   authorId: vine.string(),
});
