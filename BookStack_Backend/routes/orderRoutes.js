import express from "express";
import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import Book from "../models/Book.js"; // ✅ Import Book Model

const router = express.Router();

/** 
 * ✅ POST Route - Place Order 
 */
router.post("/place-order", async (req, res) => {
  try {
    let { userId, items, totalAmount, status } = req.body;

    if (!userId || !items || !totalAmount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Ensure `userId` is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const newOrder = new Order({
      userId, // ✅ No need to re-convert
      items,
      totalAmount,
      status: status || "pending",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/** 
 * ✅ GET Route - Fetch Orders for a Specific User 
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("🔍 Fetching orders for user:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // ✅ Find Orders & Populate Book Details
    const orders = await Order.find({ userId }).populate({
      path: "items.bookId", // Assuming items contain bookId
      model: Book, // ✅ Reference Book Model
      select: "title author price", // ✅ Fetch only required fields
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
