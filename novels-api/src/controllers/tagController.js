import vine, { errors } from "@vinejs/vine";
import {
   createTag,
   deleteTagById,
   getAllTags,
   updateTagById,
} from "../services/tag.services.js";
import {
   newTagSchema,
   tagIdSchema,
   updateTagSchema,
} from "../validations/tag.validation.js";
import { StatusCodes } from "http-status-codes";
class TagController {
   // GET /tags/
   static async getAll(req, res, next) {
      try {
         const data = await getAllTags();
         res.status(StatusCodes.OK).json({
            data: data,
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }

   // POST /tags/
   /*
		"name": "tag name",
		"type": "CHARACTER/WORLD/FACTION/SIGHT"
	*/
   static async create(req, res, next) {
      try {
         const { name, type } = req.body;
         const validator = vine.compile(newTagSchema);
         const payload = await validator.validate({
            name: name,
            type: type.toUpperCase(),
         });
         const newTag = await createTag(payload);
         res.status(StatusCodes.CREATED).json({
            data: newTag,
            ok: true,
            statusCode: StatusCodes.CREATED,
         });
      } catch (error) {
         next(error);
      }
   }

   // PUT /tags/:tagId
   /*
		"name": "tag name",
		"type": "CHARACTER/WORLD/FACTION/SIGHT"
	*/
   static async update(req, res, next) {
      try {
         const tagId = req.params?.tagId || null;
         const validator = vine.compile(updateTagSchema);
         const payload = await validator.validate({
            ...req.body,
            tagId: tagId,
         });
         const updatedTag = await updateTagById(payload.tagId, {
            name: payload.name,
            type: payload.type,
         });
         res.status(StatusCodes.OK).json({
            data: updatedTag,
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }

   // DELETE /tags/:tagId
   static async delete(req, res, next) {
      try {
         const tagId = req.params?.tagId || null;
         const validator = vine.compile(tagIdSchema);
         const payload = await validator.validate({
            tagId: tagId,
         });
         const deletedTag = await deleteTagById(payload.tagId);
         if (!deletedTag) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "Khong the xoa tag nay vi co truyen thuoc tag nay.",
               ok: false,
               statusCode: StatusCodes.BAD_REQUEST,
            });
         }
         res.status(StatusCodes.OK).json({
            data: "Xoa tag thanh cong.",
            ok: true,
            statusCode: StatusCodes.OK,
         });
      } catch (error) {
         next(error);
      }
   }
}
export default TagController;
