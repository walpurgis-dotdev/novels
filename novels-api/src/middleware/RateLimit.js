import rateLimit from "express-rate-limit";

export const rateLimitMiddleware = rateLimit({
   windowMs: 1 * 60 * 1000, // 1 minutes
   max: 100, // limit each IP to 100 requests per windowMs
   message: "Vui lòng thử lại sau ít phút.",
});
