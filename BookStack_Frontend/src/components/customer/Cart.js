import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice"; 
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart); 
  const user = useSelector((state) => state.auth.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🛒 Cart Items in Redux:", cart);
  }, [cart]);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("⚠️ Please log in first!");
      return;
    }
    if (cart.length === 0) {
      alert("⚠️ Cart is empty!");
      return;
    }

    const orderData = {
      userId: user._id,
      items: cart.map((book) => ({
        bookId: book._id,
        title: book.title,
        quantity: book.quantity || 1,
      })),
      totalAmount: cart.reduce((total, book) => total + book.price * (book.quantity || 1), 0),
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Order failed");
      alert("🎉 Order Placed Successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Order error:", error);
      alert("⚠️ Order failed! Please try again.");
    }
  };

  return (
    <div style={{ backgroundColor: "#FFE4E1", color: "#4A0905", padding: "20px", minHeight: "80vh" }}>
      <h2 style={{ textAlign: "left", marginBottom: "20px" }}>🛒 Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((book) => (
            <div
              key={book._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #800000",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                backgroundColor: "#FFF5EE",
              }}
            >
              <div>
                <h3 style={{ color: "#B22222" }}>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Price: ₹{book.price}</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(book._id)}
                style={{
                  backgroundColor: "#800000",
                  color: "#fff",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                🗑 Remove
              </button>
            </div>
          ))}

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button
              onClick={handlePlaceOrder}
              style={{
                backgroundColor: "#800000",
                color: "#fff",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              ✅ Place Order
            </button>

            <button
              onClick={() => navigate("/books")}
              style={{
                backgroundColor: "#800000",
                color: "#fff",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              📚 Available Books
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
