import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../libs/utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  try {
    const { username, tagName, email, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ username, tagName });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });    
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      tagName,
      email,    
      password: hashedPassword,
    });

    Promise.all([
      generateAccessToken(user._id, res),
      generateRefreshToken(user._id, res),
    ]);

    await user.save();
    res.status(201).json({ ...user._doc, password: undefined });
  } catch (error) {
    console.error(`Error in signup controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if(!user) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    Promise.all([
      generateAccessToken(user._id, res),
      generateRefreshToken(user._id, res),
    ]);

    res.status(200).json({ ...user._doc, password: undefined });
  } catch (error) {
    console.error(`Error in login controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(`Error in logout controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if(!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ ...user._doc, password: undefined });
  } catch (error) {
    console.error(`Error in getUser controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};