import { Router } from "express";
import ChapterController from "../controllers/chapterController.js";

const router = Router();

router.post("/", ChapterController.createRate);
router.delete("/:rateId", ChapterController.deleteRate);

export default router;
