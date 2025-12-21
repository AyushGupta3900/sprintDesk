import { Router } from "express";
import { register, login , getMe } from "../controllers/auth.controller.js";
import { authRateLimiter, strictAuthRateLimiter } from "../middlewares/rate-limit.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", strictAuthRateLimiter ,register);
router.post("/login", strictAuthRateLimiter ,login);
router.get("/me",authRateLimiter, authMiddleware , getMe);

export default router;