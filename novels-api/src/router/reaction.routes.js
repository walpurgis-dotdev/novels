import { Router } from "express";
import ChapterController from "../controllers/chapterController.js";

const router = Router();

router.post("/", ChapterController.createReaction);
router.delete("/:reactionId", ChapterController.deleteReaction);

export default router;
