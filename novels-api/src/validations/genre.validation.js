import vine, { SimpleMessagesProvider } from "@vinejs/vine";
import {
   CustomErrorReporter,
   customErrorMessage,
} from "./CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();
vine.messagesProvider = new SimpleMessagesProvider(customErrorMessage);
export const newGenreSchema = vine.object({
   name: vine.string().minLength(3).maxLength(250).trim(),
   description: vine.string().minLength(3).maxLength(250).trim(),
});

export const updateGenreSchema = vine.object({
   genreId: vine.number().min(1).positive(),
   name: vine.string().minLength(3).maxLength(250).trim().optional(),
   description: vine.string().minLength(3).maxLength(250).trim().optional(),
});

export const deleteGenreSchema = vine.object({
   genreId: vine.number().min(1).positive(),
});
