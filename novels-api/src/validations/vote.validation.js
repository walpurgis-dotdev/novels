import vine, { SimpleMessagesProvider } from "@vinejs/vine";
import {
   CustomErrorReporter,
   customErrorMessage,
} from "./CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();
vine.messagesProvider = new SimpleMessagesProvider(customErrorMessage);

export const voteSchema = vine.object({
   novelId: vine.string().trim(),
   userId: vine.string().trim(),
   flowers: vine.number().min(1).positive(),
});
