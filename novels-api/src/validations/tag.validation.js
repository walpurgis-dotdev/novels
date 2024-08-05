import vine, { SimpleMessagesProvider } from "@vinejs/vine";
import {
   CustomErrorReporter,
   customErrorMessage,
} from "./CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();
vine.messagesProvider = new SimpleMessagesProvider(customErrorMessage);

export const newTagSchema = vine.object({
   name: vine.string().minLength(3).maxLength(255).trim(),
   type: vine.enum(["CHARACTER", "WORLD", "FACTION", "SIGHT"]),
});

export const updateTagSchema = vine.object({
   tagId: vine.number().min(1).positive(),
   name: vine.string().minLength(3).maxLength(255).trim().optional(),
   type: vine.enum(["CHARACTER", "WORLD", "FACTION", "SIGHT"]).optional(),
});

export const tagIdSchema = vine.object({
   tagId: vine.number().min(1).positive(),
});
