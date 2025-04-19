import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  games: [
    {
      type: String,
      default: "",
    }
  ],
  tagName: {
    type: String,
    minLength: 4,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  profileImg: {
    type: String,
    default: "",
  },
  coverImg: {
    type: String,
    default: "",
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;