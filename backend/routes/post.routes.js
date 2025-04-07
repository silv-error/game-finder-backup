import express from "express";
import { accessRoute } from "../middleware/accessRoute.js";
import { createPost, getAllPosts, getLatestPost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", accessRoute, getAllPosts);
router.get("/latest", accessRoute, getLatestPost);
router.post("/create", accessRoute, createPost);

export default router;