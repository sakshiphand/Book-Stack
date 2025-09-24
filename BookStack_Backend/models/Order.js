import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  customerName: { type: String, required: true },
  bookTitle: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" } // New field to track order status
});

export default mongoose.model("Order", OrderSchema);
