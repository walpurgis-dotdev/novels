import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import prismaErrorHandle from "../validations/prismaErrorHandle.js";
import "dotenv/config";
import { errors } from "@vinejs/vine";
import sendLogger from "../loggers/telegram.log.js";

export const errorHandlingMiddleware = async (err, req, res, next) => {
   // Kiểm tra lỗi có phải là lỗi của Prisma không
   if (err instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = prismaErrorHandle(err.code);
      err.statusCode = prismaError.code;
      err.message = prismaError.message;
   }

   // Kiểm tra xem lỗi có phải do validate không
   if (err instanceof errors.E_VALIDATION_ERROR) {
      err.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
      err.message = err.messages;
   }

   // Nếu dev không cẩn thận thiếu statusCode thì mặc định sẽ để code 500 INTERNAL_SERVER_ERROR
   if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

   // Tạo ra một biến responseError để kiểm soát những gì muốn trả về
   const responseError = {
      statusCode: err.statusCode,
      ok: false,
      message: err.message || StatusCodes[err.statusCode],
      stack: err.stack,
   };

   // Chỉ khi môi trường là DEV thì mới trả về Stack Trace để debug dễ dàng hơn, còn không thì xóa đi.
   if (process.env.BUILD_MODE !== "dev") delete responseError.stack;

   // Gửi lỗi sang discord / telegram
   if (process.env.BUILD_MODE === "prod") {
      await sendLogger({
         statusCode: responseError.statusCode,
         message: responseError.message,
         userId: req.user?.id,
      });
   }

   res.status(responseError.statusCode).json(responseError);
};
