import vine from "@vinejs/vine";

import { createVote } from "../services/vote.services.js";
import { StatusCodes } from "http-status-codes";
import { ADMIN, MOD } from "../utils/constants.js";

import { voteSchema } from "../validations/vote.validation.js";
import {
   newReviewSchema,
   reviewSchema,
} from "../validations/rate.validation.js";
import {
   createReview,
   deleteReview,
   getReview,
} from "../services/review.services.js";
class ReviewController {
   // POST /review
   static async createReview(req, res, next) {
      try {
         // bao gồm novelId trong body
         const body = req.body;
         const { userId } = req.user;

         const validator = vine.compile(newReviewSchema);
         const payload = await validator.validate({ ...body, userId });

         const newRate = await createReview(payload);
         res.status(StatusCodes.CREATED).json({
            data: newRate,
            message: "Bạn đã đánh giá tác phẩm thành công",
            ok: true,
            statusCode: StatusCodes.CREATED,
         });
      } catch (error) {
         next(error);
      }
   }

   // DELETE /review
   static async deleteReview(req, res, next) {
      try {
         const { userId, role } = req.user;
         const { rateId } = req.body;

         const validator = vine.compile(reviewSchema);
         const payload = await validator.validate({ userId, rateId });

         if (
            !(role === MOD || role === ADMIN || (await getReview(payload.id)))
         ) {
            return res.status(StatusCodes.FORBIDDEN).json({
               message: "Bạn không có quyền xóa đánh giá này",
               ok: false,
               statusCode: StatusCodes.FORBIDDEN,
            });
         }
         await deleteReview(payload.id);
         return res.status(StatusCodes.OK).json({
            message: "Đã xóa đánh giá thành công",
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }

   // Người dùng tặng hoa
   // POST /review/vote
   static async createVote(req, res, next) {
      try {
         const body = req.body;
         const { userId } = req.user;

         const validator = vine.compile(voteSchema);
         const payload = await validator.validate({ ...body, userId });

         const newVote = await createVote(payload);

         if (!newVote) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "Bạn không đủ hoa để thực hiện giao dịch này",
               ok: false,
               code: StatusCodes.BAD_REQUEST,
            });
         }

         res.status(StatusCodes.CREATED).json({
            data: newVote,
            message: `Bạn đã tặng ${payload.flowers} hoa thành công`,
            ok: true,
            code: StatusCodes.CREATED,
         });
      } catch (error) {
         next(error);
      }
   }
}
export default ReviewController;
