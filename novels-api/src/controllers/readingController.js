import vine from "@vinejs/vine";
import { createHistory, getHistory } from "../services/history.services.js";
import { SKIPLIMIT } from "../utils/constants.js";
import { pageSchema } from "../validations/public.validation.js";

class ReadingController {
   static async getReading(req, res) {
      try {
         const { userId } = req.user;
         const page = req.query.page || 1;
         const validator = vine.compile(pageSchema);
         const payload = await validator.validate({ page });
         const skip = (payload.page - 1) * SKIPLIMIT;
         const reading = await getHistory(userId, SKIPLIMIT, skip);
         res.status(StatusCodes.OK).json({
            data: reading,
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }

   static async createReading(req, res, next) {
      try {
         const { userId } = req.user;
         const { novelId, chapterId } = req.body;
         const reading = await createHistory(userId, novelId, chapterId);
         res.status(StatusCodes.CREATED).json({
            data: reading,
            ok: true,
            statusCode: StatusCodes.CREATED,
         });
      } catch (error) {
         next(error);
      }
   }
}

export default ReadingController;
