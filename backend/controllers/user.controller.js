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

    const existingUser  = await User.findOne({ _id: { $ne: userId }, username: username || user.username, tagName: tagName || user.tagName });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

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

    if (games) {
      const gameExist = user.games.find(game => game === games);
      if(gameExist) return res.status(400).json({ error: "Game already exists" });

      user = await User.findByIdAndUpdate({ _id: userId }, { 
        $push: {
          games
        }
      }, { new: true });
    }

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
    const userId = req.user._id;
    const users = await User.find({ _id: { $ne: userId }});
    if(!users) return res.status(404).json({ error: "Users not found" });
    res.status(200).json(users);
  } catch (error) {
    console.error(`Error in getActivePlayers controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getGameList = async (req, res) => {
  try {

    const user = req.user;
    const games = [
      "Valorant",
      "Minecraft",
      "League of Legends",
      "CS2",
      "Dota 2",
      "Apex Legends",
      "Fortnite",
      "Call of Duty: Warzone",
      "Among Us",
      "Genshin Impact",
      "Rainbow Six Siege",
      "Overwatch",
      "Destiny 2",
      "Sea of Thieves",
      "Rust",
      "World of Warcraft",
      "Final Fantasy XIV",
      "Monster Hunter: World",
      "Phasmophobia",
      "ARK: Survival Evolved"
    ];

    const gameList = games.filter(game => !user.games.includes(game));

    res.status(200).json(gameList);
  } catch (error) {
    console.error(`Error in getGameList controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const deleteGames = async (req, res) => {
  try {
    const gameName = req.params.name;
    const userId = req.user._id;

    await User.findByIdAndUpdate({ _id: userId }, { $pull: { games: gameName } });

    res.status(200).json({ message: "Game deleted successfully" });

  } catch (error) { 
    console.error(`Error in deleteGames controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}