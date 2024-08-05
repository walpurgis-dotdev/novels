import vine from "@vinejs/vine";
import {
   createAuthor,
   deleteAuthorById,
   getAllAuthors,
   getAuthorById,
   updateAuthorById,
} from "../services/author.services.js";
import AuthorApiTransform from "../transform/AuthorApiTransform.js";
import {
   newAuthorSchema,
   updateAuthorSchema,
} from "../validations/author.validation.js";
import { StatusCodes } from "http-status-codes";
import { idSchema } from "../validations/public.validation.js";
import { SKIPLIMIT } from "../utils/constants.js";

class AuthorController {
   // GET /?page=1
   static async getAllAuthors(req, res, next) {
      try {
         let { page } = req.query;
         page = Number.parseInt(page) ? Number.parseInt(page) : 1;
         const skip = (page - 1) * SKIPLIMIT;
         const authors = await getAllAuthors(skip, SKIPLIMIT);
         return res.status(StatusCodes.OK).json({
            data: authors,
            ok: true,
            statusCode: StatusCodes.OK,
            metadata: {
               currentPage: page,
               totalPage: authors.totalPages,
               take: SKIPLIMIT,
            },
         });
      } catch (error) {
         next(error);
      }
   }
   // GET /:authorId
   static async getAuthorById(req, res, next) {
      try {
         const { authorId } = req.params;
         const author = await getAuthorById(authorId);
         const authorTransform = AuthorApiTransform.transform(author);
         return res.status(StatusCodes.OK).json({
            data: authorTransform,
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }
   // POST /
   static async createAuthor(req, res, next) {
      try {
         const validator = vine.compile(newAuthorSchema);
         const payload = await validator.validate(req.body);

         const newAuthor = await createAuthor(payload);

         return res.status(StatusCodes.CREATED).json({
            data: newAuthor,
            ok: true,
            statusCode: StatusCodes.CREATED,
         });
      } catch (error) {
         next(error);
      }
   }
   // PUT /:authorId
   static async updateAuthor(req, res, next) {
      try {
         const { authorId } = req.params;
         const { name, originalName } = req.body;
         const validator = vine.compile(updateAuthorSchema);
         const payload = await validator.validate({
            name: name,
            authorId: authorId,
            originalName: originalName,
         });
         const updateAuthor = await updateAuthorById(
            payload.authorId,
            payload.name,
            payload.originalName,
         );
         return res.status(StatusCodes.OK).json({
            data: updateAuthor,
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }
   // DELETE /:authorId
   static async deleteAuthor(req, res, next) {
      try {
         const { authorId } = req.params;
         const validator = vine.compile(idSchema);
         const payload = await validator.validate({ id: authorId });
         const result = await deleteAuthorById(payload.id);
         if (!result) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               data: "Hãy xoá truyện trước khi xoá tác giả.",
               ok: false,
               statusCode: StatusCodes.BAD_REQUEST,
            });
         }
         return res.status(StatusCodes.OK).json({
            data: "Xoá tác giả thành công.",
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }
}
export default AuthorController;
