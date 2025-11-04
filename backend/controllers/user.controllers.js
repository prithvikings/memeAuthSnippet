import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const getProfile = async (req, res) => {
  try {
    // ✅ Get token from cookies (preferred) or Authorization header
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded?.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // ✅ Find user by ID (exclude password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
  success: true,
  message: "User profile fetched successfully",
  user,
});
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({ message: error.message });
  }
};
