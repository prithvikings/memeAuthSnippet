import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { isValidEmail, isValidPassword } from "../validation/isValid.js";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import generateToken from "../config/token.js";

export const registerUser = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  try {
    // Validate email and password
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain at least one number and one special character",
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);

    // Set cookie
   res.cookie("token", token, {
  httpOnly: true,
  secure: ENV.NODE_ENV === "production" ? true : false, // false for localhost
  sameSite: ENV.NODE_ENV === "production" ? "none" : "lax", // ✅ allow cross-site cookies
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

    // Exclude password before sending response
    const { password: _, ...userData } = newUser.toObject();

    res.status(201).json({
      message: "User registered successfully",
      user: userData,
      token, // optional – remove if you only want to rely on cookies
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user._id);
    
    // Set cookie
    res.cookie("token", token, {
  httpOnly: true,
  secure: ENV.NODE_ENV === "production" ? true : false, // false for localhost
  sameSite: ENV.NODE_ENV === "production" ? "none" : "lax", // ✅ allow cross-site cookies
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
    const { password: _, ...userData } = user.toObject();

    res.status(200).json({
      message: "Login successful",
      user: userData,
      token, // optional
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie("token", {
  httpOnly: true,
  secure: ENV.NODE_ENV === "production" ? true : false,
  sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
});

    res.status(200).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging out",
      error: error.message,
    });
  }
};