import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ ...user._doc, password: undefined });
  } catch (error) {
    console.error(`Error in getUserProfile controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const updateUserProfile = async (req, res) => {
  try {
    let { profileImg, coverImg } = req.body;
    const { games, username, tagName, bio } = req.body;
    const userId = req.user._id;
    let user = await User.findById({ _id: userId });

    if(profileImg) {
      if(user.profileImg) await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
      
      const result = await cloudinary.uploader.upload(profileImg, { folder: "user-profile", })
      profileImg = result.secure_url;
    }

    if(coverImg) {
      if(user.coverImg) await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
      
      const result = await cloudinary.uploader.upload(coverImg, { folder: "user-cover", })
      coverImg = result.secure_url;
    }

    const gameExist = user.games.find(game => game === games);
    if(gameExist) return res.status(400).json({ error: "Game already exists" });

    await User.findByIdAndUpdate({ _id: userId }, { 
      $push: {
        games
      }
    });

    user.username = username || user.username ;
    user.tagName = tagName || user.tagName;
    user.bio = bio || user.bio;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;

    await user.save();

    res.status(200).json({ ...user._doc, password: undefined });
  } catch (error) {
    console.error(`Error in updateUserProfile controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getActivePlayers = async (req, res) => {
  try {
    const users = await User.find();
    if(!users) return res.status(404).json({ error: "Users not found" });
    res.status(200).json({ users });
  } catch (error) {
    console.error(`Error in getActivePlayers controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}