import { Router } from "express";
const router = Router();
import UserController from "../controllers/userController.js";
import authAdminMiddleware from "../middleware/AuthAdmin.js";
import authMiddleware from "../middleware/Authenticate.js";

router.get("/me", authMiddleware, UserController.getUserInfo);
router.get("/access-details", authMiddleware, UserController.getAccessDetails);
router.get("/novels", authMiddleware, UserController.getNovels);
router.get("/upgrade", authMiddleware, UserController.upgrade);
router.get("/:userId", UserController.getUserById);
router.put("/", authMiddleware, UserController.update);
router.patch("/avatar", UserController.updateAvatar);
router.delete(
	"/:userId",
	authMiddleware,
	authAdminMiddleware,
	UserController.blockUser,
);

export default router;
