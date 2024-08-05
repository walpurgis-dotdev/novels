import { Router } from "express";
import ChapterController from "../controllers/chapterController.js";
import authMiddleware from "../middleware/Authenticate.js";

const router = Router();
router.get("/", ChapterController.getChapters);
router.get("/:chapterId", ChapterController.getChapterById);
router.post("/", authMiddleware, ChapterController.create);
router.put("/:chapterId", authMiddleware, ChapterController.update);
router.delete("/:chapterId", authMiddleware, ChapterController.delete);

export default router;
