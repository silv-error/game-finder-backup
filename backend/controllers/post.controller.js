import Post from "../models/post.model.js";

export const getAllPosts = async (req, res) => {
  try {
    const excludePost = await Post.find()
    .sort({ createdAt: -1 })
    .limit(3);

    const posts = await Post.find({
      _id: { $nin: excludePost.map(post => post._id) }
    })
    .sort({ createdAt: -1 })
    .populate({ path: "user", select: "-password" });

    if (!posts) return res.status(404).json({ error: "Posts not found" });
    res.status(200).json(posts);
  } catch (error) {
    console.error(`Error in getAllPosts controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getLatestPost = async (req, res) => {
  try {
    const post = await Post.find({})
    .sort({ createdAt: -1 })
    .populate({ path: "user", select: "-password" })
    .limit(3);
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

export const getInvites = async (req, res) => {
  try {
    const userId = req.user._id;
    const invites = await Post.find({ user: userId }).populate({
      path: "user",
      select: "-password"
    });
    if(!invites) return res.status(404).json({ error: "No invites found" });

    res.status(200).json(invites);
  } catch (error) {
    console.error(`Error in getting invites: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}