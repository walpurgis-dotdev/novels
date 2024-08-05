import { Router } from "express";
import GenreController from "../controllers/genreController.js";
import authMiddleware from "../middleware/Authenticate.js";
import authAdminMiddleware from "../middleware/AuthAdmin.js";

const router = Router();

/* GET users listing. */
router.get("/", GenreController.getAll);
router.post("/", authMiddleware, authAdminMiddleware, GenreController.create);
router.put(
   "/:genreId",
   authMiddleware,
   authAdminMiddleware,
   GenreController.update,
);
router.delete(
   "/:genreId",
   authMiddleware,
   authAdminMiddleware,
   GenreController.delete,
);

export default router;
