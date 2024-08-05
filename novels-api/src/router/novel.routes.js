import { Router } from "express";
import NovelController from "../controllers/novelController.js";
import authAdminMiddleware from "../middleware/AuthAdmin.js";
import authMiddleware from "../middleware/Authenticate.js";

const router = Router();
router.get("/", NovelController.getNovels);
router.get("/:idorslug", NovelController.getNovel);
router.get("/:novelId/convert", authMiddleware, NovelController.convertNovel);
router.patch("/:novelId/cover", authMiddleware, NovelController.updateCover);
router.post("/check", authMiddleware, NovelController.checkExist);
router.post("/", authMiddleware, NovelController.createNovel);
router.put("/:id", authMiddleware, NovelController.update);

// publish novel
router.get(
	"/:novelId/publish",
	authMiddleware,
	authAdminMiddleware,
	NovelController.publish,
);
router.delete("/:novelId", authMiddleware, NovelController.delete);
export default router;
