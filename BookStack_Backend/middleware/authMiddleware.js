
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Customer from "../models/Customer.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // ✅ Decode token correctly
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded Token:", decoded); // Debugging - Check if token is decoded properly

      // ✅ Find user by ID using decoded.id
      req.user = await Customer.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("User not found, authorization denied");
      }

      next(); // Proceed to next middleware
    } catch (error) {
      console.error("Auth Error:", error);
      res.status(401).json({ message: "Invalid token, authorization failed" });
    }
  } else {
    res.status(401).json({ message: "No token provided, authorization denied" });
  }
});
