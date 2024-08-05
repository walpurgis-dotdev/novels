import vine from "@vinejs/vine";
import {
   createComment,
   deleteCommentById,
   getCommentsByNovelId,
   likeComment,
} from "../services/comment.services.js";
import {
   commentIdSchema,
   getCommentsSchema,
   newCommentSchema,
} from "../validations/comment.validation.js";
import { StatusCodes } from "http-status-codes";
import { SKIPLIMIT } from "../utils/constants.js";
import CommentApiTransform from "../transform/CommentApiTransform.js";
class CommentController {
   // GET /comments/:novelId?page=1
   static async getCommentsByNovelId(req, res, next) {
      try {
         const { novelId } = req.params;
         const page = req.query?.page || 1;
         const userId = req.userId || null;
         const parentId = req.query?.parentId;

         const validator = vine.compile(getCommentsSchema);
         const payload = await validator.validate({
            novelId,
            parentId,
            page,
         });
         const skip = (payload.page - 1) * SKIPLIMIT;
         const { comments, total } = await getCommentsByNovelId(
            payload.novelId,
            payload.parentId,
            skip,
            SKIPLIMIT,
            userId,
         );
         const transformedComments = comments.map((comment) =>
            CommentApiTransform.transform(comment),
         );
         return res.status(StatusCodes.OK).json({
            data: transformedComments,
            metadata: {
               total,
               page: payload.page,
               limit: SKIPLIMIT,
            },
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }
   // POST /comments
   // body = {novelId, chapterId, parentId(optional), content}
   static async createComment(req, res, next) {
      try {
         const { userId } = req.user;
         const body = req.body;

         const validator = vine.compile(newCommentSchema);
         const payload = await validator.validate({ userId, ...body });

         await createComment(payload);
         return res.status(StatusCodes.CREATED).json({
            message: "Tao binh luan thanh cong.",
            ok: true,
            statusCode: StatusCodes.CREATED,
         });
      } catch (error) {
         next(error);
      }
   }

   // PATCH /comments/like
   static async likeComment(req, res, next) {
      try {
         const { commentId } = req.body;
         const { userId } = req.user;

         const validator = vine.compile(commentIdSchema);
         const payload = await validator.validate({
            commentId,
            userId,
         });

         await likeComment(payload.commentId, payload.userId);
         return res.status(StatusCodes.OK).json({
            message: "Đã thích bình luận.",
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }

   // PATCH /comments/unlike
   static async unlikeComment(req, res, next) {
      try {
         const { commentId } = req.body;
         const { userId } = req.user;

         const validator = vine.compile(commentIdSchema);
         const payload = await validator.validate({
            commentId,
            userId,
         });

         await likeComment(payload.commentId, payload.userId);
         return res.status(StatusCodes.OK).json({
            message: "Đã bỏ thích bình luận.",
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }

   // DELETE /comments/:commentId
   static async delete(req, res, next) {
      try {
         const { commentId } = req.params;
         const { userId } = req.user;

         const validator = vine.compile(commentIdSchema);
         const payload = await validator.validate({
            commentId,
            userId,
         });

         await deleteCommentById(payload.commentId, payload.userId);
         return res.status(StatusCodes.OK).json({
            message: "Đã xóa bình luận.",
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }
}

export default CommentController;
