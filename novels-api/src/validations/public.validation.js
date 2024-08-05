import vine, { SimpleMessagesProvider } from "@vinejs/vine";
import {
   CustomErrorReporter,
   customErrorMessage,
} from "./CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();
vine.messagesProvider = new SimpleMessagesProvider(customErrorMessage);

export const pageSchema = vine.object({
   page: vine.number().min(1).positive(),
});

export const idSchema = vine.object({
   id: vine.string().trim(),
});
