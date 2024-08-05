import { Router } from "express";
import AuthController from "../controllers/authController.js";
import authMiddleware from "../middleware/Authenticate.js";
const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.delete("/logout", authMiddleware, AuthController.logout);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/reset-password", authMiddleware, AuthController.resetPassword);
router.post("/send-otp", authMiddleware, AuthController.sendOtp);
router.post("/verify-otp", authMiddleware, AuthController.verifyOtp);
export default router;
