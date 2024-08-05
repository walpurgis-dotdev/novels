import { Router } from "express";
import DonateController from "../controllers/donateController.js";

const router = Router();
// Thêm tiền vào tài khoản
router.post("/", DonateController.create);
// Tặng tiền cho truyện
router.patch("/", DonateController.donate);

export default router;
