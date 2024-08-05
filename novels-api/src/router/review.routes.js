import { Router } from "express";
import ReviewController from "../controllers/reviewController.js";

const router = Router();

// danh gia novel
router.post("/", ReviewController.createReview);
router.delete("/", ReviewController.deleteReview);

// tang hoa cho novel

router.post("/vote", ReviewController.createVote);

export default router;
