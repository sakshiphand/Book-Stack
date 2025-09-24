import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const OrderBook = ({ bookId }) => {
  const user = useSelector((state) => state.auth.user); // Get logged-in user

  const handleOrder = async () => {
    if (!user) {
      alert("You need to log in to place an order.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/orders", {
        userId: user._id, // Send userId
        bookId, // Send bookId
        customerName: user.name, // Assuming user has a "name" field
      });

      alert(response.data.message); // Show success message
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={handleOrder}>
      Order Now
    </button>
  );
};

export default OrderBook;