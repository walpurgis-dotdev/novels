import vine, { SimpleMessagesProvider } from "@vinejs/vine";
import {
   CustomErrorReporter,
   customErrorMessage,
} from "./CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();
vine.messagesProvider = new SimpleMessagesProvider(customErrorMessage);

export const registerSchema = vine.object({
   name: vine
      .string()
      .minLength(3)
      .maxLength(50)
      .regex(/^[^!@#$%())*&]+$/),
   email: vine.string().email().trim(),
   password: vine.string().minLength(6).maxLength(100).confirmed().trim(),
});

export const loginSchema = vine.object({
   email: vine.string().email().trim(),
   password: vine.string(),
});

export const resetPassSchema = vine.object({
   password: vine.string().minLength(6).maxLength(100).trim(),
   newpassword: vine.string().minLength(6).maxLength(100).confirmed().trim(),
});
