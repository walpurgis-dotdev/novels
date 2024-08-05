import { Router } from "express";
import noticeController from "../controllers/noticeController.js";
import authAdminMiddleware from "../middleware/AuthAdmin.js";

const router = Router();

// readed all notice
router.get("/readed", noticeController.updateAllNoticeReaded);
// readed notice
router.get("/:id/readed", noticeController.updateNoticeReaded);
router.get("/", noticeController.getNoticeByUserId);
// new notice
router.post("/", authAdminMiddleware, noticeController.createNotice);
router.delete("/:id", authAdminMiddleware, noticeController.deleteNoticeById);
router.delete("/", noticeController.deleteNoticeByUserId);
export default router;
