import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { strictAuthRateLimiter } from "../middlewares/rate-limit.middleware.js";

const router = Router();

router.post("/register", strictAuthRateLimiter ,register);
router.post("/login", strictAuthRateLimiter ,login);

export default router;
