import vine from "@vinejs/vine";
import {
   createGenre,
   deleteGenreById,
   getAllGenre,
   updateGenreById,
} from "../services/genre.services.js";
import {
   deleteGenreSchema,
   newGenreSchema,
   updateGenreSchema,
} from "../validations/genre.validation.js";
import { StatusCodes } from "http-status-codes";
class GenreController {
   // GET /genre/
   static async getAll(req, res, next) {
      try {
         const data = await getAllGenre();

         res.status(StatusCodes.OK).json({
            data: data,
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }

   // POST /genre/

   static async create(req, res, next) {
      try {
         const body = req.body;
         const validator = vine.compile(newGenreSchema);
         const payload = await validator.validate(body);
         const newGenre = await createGenre(payload.name, payload.description);

         res.status(StatusCodes.CREATED).json({
            data: newGenre,
            ok: true,
            statusCode: StatusCodes.CREATED,
         });
      } catch (error) {
         next(error);
      }
   }

   // PUT /genre/:id

   static async update(req, res, next) {
      try {
         const genreId = Number.parseInt(req.params?.genreId) || null;
         const validator = vine.compile(updateGenreSchema);
         const payload = await validator.validate({
            genreId: genreId,
            ...req.body,
         });
         const updatedGenre = await updateGenreById(payload.genreId, {
            name: payload.name,
            description: payload.description,
         });
         res.status(StatusCodes.CREATED).json({
            data: updatedGenre,
            ok: true,
            statusCode: StatusCodes.CREATED,
         });
      } catch (error) {
         next(error);
      }
   }

   // DELETE /genre/:id
   static async delete(req, res) {
      try {
         const validator = vine.compile(deleteGenreSchema);
         const payload = await validator.validate(req.params);
         const deletedGenre = await deleteGenreById(payload.genreId);
         if (!deletedGenre) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "The loai nay dang co truyen, khong the xoa.",
               ok: false,
               statusCode: StatusCodes.BAD_REQUEST,
            });
         }
         res.status(StatusCodes.OK).json({
            message: "Da xoa the loai thanh cong.",
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }
}
export default GenreController;
