import { Telegraf } from "telegraf";
import "dotenv/config";

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const bot = new Telegraf(token);

const sendLogger = async ({ statusCode, message, userId }) => {
   // Hàm này sẽ escape các ký tự đặc biệt cho MarkdownV2
   function escapeMarkdownV2(text) {
      return text.replace(/_*[\~`>#+-=|{}.!]/g, (x) => "\\" + x);
   }

   const formattedMessage = `
    ❗❗❗Có lỗi xảy ra ❗❗❗
    *Status Code*: ${escapeMarkdownV2(String(statusCode))}
    *Message*: ${escapeMarkdownV2(message)}
    *userId*: ${escapeMarkdownV2(String(userId))}
    *Time*: ${escapeMarkdownV2(new Date().toLocaleString())}
      `;
   try {
      await bot.telegram.sendMessage(chatId, formattedMessage, {
         parse_mode: "MarkdownV2",
      });
   } catch (error) {
      console.error("Error sending log message:", error);
   }
};

export default sendLogger;
