import express from "express";
import { accessRoute } from "../middleware/accessRoute.js";
import { getConversations, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/", accessRoute, getConversations);
router.get("/:id", accessRoute, getMessages);
router.post("/send/:id", accessRoute, sendMessage);

export default router;