import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";

// 🔹 Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ✅ Login Customer
const loginCustomer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  console.log("Login Attempt with Email:", email); // Debugging

  const user = await Customer.findOne({ email });

  if (!user) {
    console.log("❌ User not found in database");
    res.status(401);
    throw new Error("Invalid email or password");
  }

  console.log("🔹 Stored Hashed Password:", user.password);

  // ✅ Fix: Compare hashed password using bcrypt
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  console.log("🔹 Password Match:", isPasswordMatch);

  if (isPasswordMatch) {
    console.log("✅ User authenticated successfully");

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    console.log("❌ Password does not match");
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// ✅ GET Profile
const getProfile = asyncHandler(async (req, res) => {
  console.log("User ID from token:", req.user ? req.user._id : "No user found");

  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }

  const user = await Customer.findById(req.user._id).select("-password");

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// ✅ UPDATE Profile
const updateProfile = asyncHandler(async (req, res) => {
  const user = await Customer.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    if (req.body.password) {
      // ✅ Hash new password before saving
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    // ✅ Send updated token
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id), // 🔹 New token
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// ✅ Export Correctly
export { loginCustomer, getProfile, updateProfile };