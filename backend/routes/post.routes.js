import express from "express";
import { accessRoute } from "../middleware/accessRoute.js";
import { createPost, deletePost, getAllPosts, getInvites, getLatestPost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", accessRoute, getAllPosts);
router.get("/latest", accessRoute, getLatestPost);
router.post("/create", accessRoute, createPost);
router.get("/invites", accessRoute, getInvites);
router.delete("/:id", accessRoute, deletePost);

export default router;
