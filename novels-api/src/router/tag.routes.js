import { Router } from "express";
import TagController from "../controllers/tagController.js";
import authAdminMiddleware from "../middleware/AuthAdmin.js";
import authMiddleware from "../middleware/Authenticate.js";

const router = Router();

/* GET users listing. */
router.get("/", TagController.getAll);
router.post("/", authMiddleware, TagController.create);
router.put("/:tagId", authMiddleware, TagController.update);
router.delete(
   "/:tagId",
   authMiddleware,
   authAdminMiddleware,
   TagController.delete,
);

export default router;
