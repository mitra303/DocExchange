import { Router } from "express";
import {
  register,
  login,
  sendResetLink,
  resetPassword,
  updateUser,
  getAllUsers,
} from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// Auth
router.post("/register", register);
router.post("/login", login);

// Forgot Password
router.post("/forgot-password", sendResetLink);

// Reset Password (✅ FIXED - no :token)
//router.post("/reset-password", resetPassword);
router.post("/reset-password/:token", resetPassword);


router.put("/users/:id", protect, updateUser);
router.get("/users", protect, getAllUsers);

export default router;