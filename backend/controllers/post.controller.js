import Post from "../models/post.model.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("user");
    if (!posts) return res.status(404).json({ error: "Posts not found" });
    res.status(200).json({ posts });
  } catch (error) {
    console.error(`Error in getAllPosts controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getLatestPost = async (req, res) => {
  try {
    const post = await Post.findOne()
    .sort({ createdAt: -1 })
    .populate({ path: "user", select: "-password" });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    console.error(`Error in getLatestPost controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const createPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, rank, type, description } = req.body;

    if (!name || !rank || !type || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const post = new Post({
      user: userId,
      name,
      rank,
      type,
      description
    });

    await post.save();

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error(`Error in createPost controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}