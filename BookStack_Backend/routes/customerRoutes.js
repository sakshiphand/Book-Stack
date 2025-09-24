import express from "express";
import { loginCustomer, updateProfile, getProfile } from "../controllers/customerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginCustomer);

// ✅ Get profile details
router.get("/profile", protect, getProfile);

// ✅ Update profile
router.put("/profile", protect, updateProfile);

export default router;
