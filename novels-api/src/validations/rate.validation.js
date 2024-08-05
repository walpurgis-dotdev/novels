import vine, { SimpleMessagesProvider } from "@vinejs/vine";
import {
   CustomErrorReporter,
   customErrorMessage,
} from "./CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();
vine.messagesProvider = new SimpleMessagesProvider(customErrorMessage);

export const newReviewSchema = vine.object({
   novelId: vine.string().trim(),
   userId: vine.string().trim(),
   character: vine.number().range(1, 5).decimal([0, 1]),
   plot: vine.number().range(1, 5).decimal([0, 1]),
   word: vine.number().range(1, 5).decimal([0, 1]),
   content: vine.string().trim(),
   spoiler: vine.boolean(),
});

export const reviewSchema = vine.object({
   id: vine.string().trim(),
   userId: vine.string().trim(),
});
