import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice"; // ✅ Import Redux action
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart); // ✅ Get cart items from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id)); // ✅ Remove book from cart
  };

  const handlePlaceOrder = () => {
    alert("🎉 Order Placed Successfully!");
    navigate("/orders"); // ✅ Redirect to Orders Page
  };

  return (
    <div>
      <h2>🛒 Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((book) => (
            <div key={book._id} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Price: ${book.price}</p>
              <button onClick={() => handleRemoveFromCart(book._id)}>🗑 Remove</button>
            </div>
          ))}
          <button onClick={handlePlaceOrder} style={{ marginTop: "10px", padding: "10px" }}>✅ Place Order</button>
        </>
      )}
    </div>
  );
};

export default Cart;