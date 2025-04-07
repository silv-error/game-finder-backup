import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const accessRoute = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ error: "Unauthorized: No token provided"});

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) return res.status(401).json({ error: "Unauthorized: Invalid token"});

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ error: "Unauthorized: User not found"});

    req.user = user;
    
    next();
  } catch (error) {
    console.error(`Error accessing route: ${error.message}`);
    process.exit(1);
  }
}