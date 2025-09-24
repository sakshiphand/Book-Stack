import Order from "../models/Order.js";
import Book from "../models/Book.js"; // Import Book model

// ✅ Place Order
export const placeOrder = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Fetch book details
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Create Order
    const order = new Order({
      userId,
      bookId,
      customerName: req.body.customerName,
      bookTitle: book.title,
      price: book.price
    });

    await order.save();
    res.status(201).json({ message: "Order Placed Successfully" });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(400).json({ error: "Order Failed" });
  }
};

// ✅ Get Orders for a Specific User
export const getOrders = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from URL
    const orders = await Order.find({ userId }); // Fetch orders for this user
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};
