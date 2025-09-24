import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user); // ✅ Get logged-in user
  const dispatch = useDispatch();

  const handleOrder = async () => {
    if (!user) {
      alert("⚠️ Please log in first!");
      return;
    }

    if (cartItems.length === 0) {
      alert("⚠️ Cart is empty!");
      return;
    }

    const orderData = {
      userId: user._id, // ✅ Include user ID
      items: cartItems.map((item) => ({
        bookId: item._id, 
        title: item.title, 
        quantity: item.quantity || 1, // ✅ Include quantity
      })),
      totalAmount: cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0),
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order failed");
      }

      alert("🎉 Order Placed Successfully!");
    } catch (error) {
      console.error("Order error:", error);
      alert("⚠️ Order failed! Please try again.");
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item._id}>
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <button onClick={() => dispatch(removeFromCart(item._id))}>Remove</button>
          </div>
        ))
      )}
      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
};

export default CartPage;