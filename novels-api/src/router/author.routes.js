import { Router } from "express";
import AuthorController from "../controllers/authorController.js";
import authMiddleware from "../middleware/Authenticate.js";
import authAdminMiddleware from "../middleware/AuthAdmin.js";
const router = Router();

router.get("/", AuthorController.getAllAuthors);
router.get("/:authorId", AuthorController.getAuthorById);
router.post(
   "/",
   authMiddleware,
   authAdminMiddleware,
   AuthorController.createAuthor,
);
router.put(
   "/:authorId",
   authMiddleware,
   authAdminMiddleware,
   AuthorController.updateAuthor,
);
router.delete(
   "/:authorId",
   authMiddleware,
   authAdminMiddleware,
   AuthorController.deleteAuthor,
);
export default router;
