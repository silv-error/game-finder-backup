import express from "express";
import { accessRoute } from "../middleware/accessRoute.js";
import { getActivePlayers, getUserProfile, updateUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:id", accessRoute, getUserProfile);
router.patch("/update", accessRoute, updateUserProfile);
router.get("/active", accessRoute, getActivePlayers);

export default router;