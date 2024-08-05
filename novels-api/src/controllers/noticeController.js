import vine from "@vinejs/vine";
import {
   getNotice,
   updateNoticeStatus,
   createNotice,
   deleteUserNotices,
   updateAllNoticeStatus,
} from "../services/notice.services.js";
import { idSchema, pageSchema } from "../validations/public.validation.js";
import { StatusCodes } from "http-status-codes";
import { SKIPLIMIT } from "../utils/constants.js";
import {
   newNoticeSchema,
   readedNoticeSchema,
} from "../validations/notice.validation.js";
import ensureArray from "../utils/ensureArray.js";

class notificationController {
   // [GET] /notice?page=1
   static async getNoticeByUserId(req, res, next) {
      try {
         const { userId } = req.user;
         const page = req.query?.page || 1;

         const validator = vine.compile(pageSchema);
         const payload = await validator.validate({ page });

         const skip = (payload.page - 1) * SKIPLIMIT;
         const data = await getNotice(userId, skip, SKIPLIMIT);
         res.status(StatusCodes.OK).json({
            data: data,
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }

   // [POST] /notice
   static async createNotice(req, res, next) {
      try {
         const body = req.body;
         body.userIds = ensureArray(body.userIds);
         const validator = vine.compile(newNoticeSchema);
         const payload = await validator.validate(body);

         await createNotice(payload);
         res.status(StatusCodes.CREATED).json({
            message: "Đã tạo thông báo mới.",
            ok: true,
            statusCode: StatusCodes.CREATED,
         });
      } catch (error) {
         next(error);
      }
   }

   // [GET] /notice/:id/readed
   static async updateNoticeReaded(req, res, next) {
      try {
         const { id } = req.params;
         const { userId } = req.user;

         const validator = vine.compile(readedNoticeSchema);
         const payload = await validator.validate({ id, userId });

         await updateNoticeStatus(payload.id, payload.userId);
         res.status(StatusCodes.OK).json({
            message: "Đã đánh dấu đã đọc.",
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }

   // [GET] /notice/readed
   static async updateAllNoticeReaded(req, res, next) {
      try {
         const { userId } = req.user;

         const validator = vine.compile(idSchema);
         const payload = await validator.validate({ id: userId });

         await updateAllNoticeStatus(payload.id);
         res.status(StatusCodes.OK).json({
            message: "Đã đánh dấu đã đọc tất cả thông báo.",
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }

   // [DELETE] /notice
   static async deleteNoticeByUserId(req, res, next) {
      try {
         const { userId } = req.user;

         const validator = vine.compile(idSchema);
         const payload = await validator.validate({ id: userId });
         const data = await deleteUserNotices(payload.id);
         res.status(StatusCodes.OK).json({
            data: data,
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }

   // [DELETE] /notice/:id
   static async deleteNoticeById(req, res, next) {
      try {
         const { id } = req.params;
         const validator = vine.compile(idSchema);
         const payload = await validator.validate({ id });
         const data = await deleteNoticeById(payload.id);
         res.status(StatusCodes.OK).json({
            data: data,
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }
}

export default notificationController;
