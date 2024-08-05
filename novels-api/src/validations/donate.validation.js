import vine, { SimpleMessagesProvider } from "@vinejs/vine";
import {
   CustomErrorReporter,
   customErrorMessage,
} from "./CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();
vine.messagesProvider = new SimpleMessagesProvider(customErrorMessage);

export const donateSchema = vine.object({
   userId: vine.string().trim(),
   amount: vine.number().min(1).positive(),
   paymentFrom: vine
      .string()
      .toUpperCase()
      .trim()
      .in(["CARD", "MOMO", "ZALO", "BANK", "PAYPAL", "KHAC"]),
});

export const newDonateSchema = vine.object({
   novelId: vine.string().trim(),
   userId: vine.string().trim(),
   amount: vine.number().min(1).positive(),
});
