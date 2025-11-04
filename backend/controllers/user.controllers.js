import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const getProfile = async (req, res) => {
  try {
    const id=req.userId;
    const user = await User.findById(id).select("-password");

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
