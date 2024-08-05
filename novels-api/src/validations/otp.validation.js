import vine, { SimpleMessagesProvider } from "@vinejs/vine";
import {
   CustomErrorReporter,
   customErrorMessage,
} from "./CustomErrorReporter.js";
vine.errorReporter = () => new CustomErrorReporter();
vine.messagesProvider = new SimpleMessagesProvider(customErrorMessage);

export const emailSchema = vine.object({
   email: vine.string().trim().email(),
});

export const otpSchema = vine.object({
   email: vine.string().trim().email(),
   otp: vine.string(),
});
