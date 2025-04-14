import express from "express";
import { accessRoute } from "../middleware/accessRoute.js";
import { deleteGames, getActivePlayers, getGameList, getUserProfile, updateUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:id", accessRoute, getUserProfile);
router.patch("/update", accessRoute, updateUserProfile);
router.delete("/delete/:name", accessRoute, deleteGames);
router.get("/active", accessRoute, getActivePlayers);
router.get("/games", accessRoute, getGameList);

export default router;