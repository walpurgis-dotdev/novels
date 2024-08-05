import vine from "@vinejs/vine";
import {
   donateSchema,
   newDonateSchema,
} from "../validations/donate.validation.js";
import { addMoney, createDonation } from "../services/donation.services.js";
import { StatusCodes } from "http-status-codes";

class DonateController {
   // POST /donate
   static async create(req, res, next) {
      try {
         const { userId } = req.user;
         const body = req.body;

         const validator = vine.compile(donateSchema);
         const payload = await validator.validate({ userId, ...body });

         await addMoney(payload.userId, payload.amount, payload.paymentFrom);

         res.status(StatusCodes.CREATED).json({
            message: `Bạn đã nạp ${payload.amount} vào tài khoản thành công`,
            ok: true,
            statusCode: StatusCodes.CREATED,
         });
      } catch (error) {
         next(error);
      }
   }
   // PATCH /donate
   static async donate(req, res, next) {
      try {
         const { amount, novelId } = req.body;
         const { userId } = req.user;

         const validator = vine.compile(newDonateSchema);
         const payload = await validator.validate({ novelId, userId, amount });

         const newDonation = await createDonation(payload);

         if (!newDonation) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "Bạn không đủ tiền để thực hiện giao dịch này",
               ok: false,
               statusCode: StatusCodes.BAD_REQUEST,
            });
         }

         res.status(StatusCodes.CREATED).json({
            message: `Bạn đã ủng hộ ${amount} cho truyện ${payload.novelId} thành công`,
            ok: true,
            statusCode: StatusCodes.CREATED,
         });
      } catch (error) {
         next(error);
      }
   }
}

export default DonateController;
