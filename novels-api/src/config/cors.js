import { WHITELIST_DOMAINS } from "../utils/constants.js";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError.js";

export const corsOptions = {
   origin: function (origin, callback) {
      // Nếu môi trường là DEV thì không cần kiểm tra CORS
      if (process.env.BUILD_MODE === "dev") {
         return callback(null, true);
      }

      // Kiểm tra dem origin có phải là domain được chấp nhận hay không
      if (WHITELIST_DOMAINS.includes(origin)) {
         return callback(null, true);
      }

      // Cuối cùng nếu domain không được chấp nhận thì trả về lỗi
      return callback(
         new ApiError(
            StatusCodes.FORBIDDEN,
            `${origin} not allowed by our CORS Policy.`,
         ),
      );
   },

   // Some legacy browsers (IE11, various SmartTVs) choke on 204
   optionsSuccessStatus: 200,
   credentials: true,
};
