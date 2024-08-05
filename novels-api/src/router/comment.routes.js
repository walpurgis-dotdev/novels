import { Router } from "express";
import CommentController from "../controllers/commentController.js";
import authMiddleware from "../middleware/Authenticate.js";

const router = Router();

router.get("/:novelId", CommentController.getCommentsByNovelId);
router.patch("/like", authMiddleware, CommentController.likeComment);
router.patch("/unlike", authMiddleware, CommentController.unlikeComment);

router.post("/", authMiddleware, CommentController.createComment);
router.delete("/:commentId", authMiddleware, CommentController.delete);

export default router;
