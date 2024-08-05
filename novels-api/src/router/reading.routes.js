import { Router } from "express";
import ReadingController from "../controllers/readingController.js";
const router = Router();

router.get("/", ReadingController.getReading);
router.post("/", ReadingController.createReading);

export default router;
