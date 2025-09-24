import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../redux/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // ✅ Get user from Redux

  // ✅ Ensure `order` state exists before destructuring
  const orderState = useSelector((state) => state.order) || {};
  const { orders = [], status, error } = orderState; // ✅ Default to empty array

  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchOrders(user._id)); // ✅ Fetch orders with correct userId
    }
  }, [dispatch, user]);

  if (!user) return <p style={{ textAlign: "center", color: "#B22222" }}>Please log in to view your orders.</p>;
  if (status === "loading") return <p style={{ textAlign: "center", color: "#4A0905" }}>Loading orders...</p>;
  if (status === "failed") return <p style={{ textAlign: "center", color: "#B22222" }}>Error: {error}</p>;

  return (
    <div style={{ 
      padding: "20px", 
      minHeight: "100vh",           // Full-page height
      backgroundColor: "#FFE4E1",   // Misty Rose background
      color: "#4A0905"              // Dark maroon text for full page
    }}>
      <div style={{ maxWidth: "900px", margin: "auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#800000" }}>📦 My Orders</h2>

        {orders.length === 0 ? (
          <p style={{ textAlign: "center", color: "#B22222" }}>No orders found.</p>
        ) : (
          <div style={{ display: "grid", gap: "20px" }}>
            {orders.map((order) => (
              <div 
                key={order._id} 
                style={{
                  padding: "15px",
                  border: "1px solid #800000", // Maroon border
                  borderRadius: "10px",
                  boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                  backgroundColor: "#FFF5EE", // Light beige
                  color: "#4A0905",
                }}
              >
                <p><strong>🆔 Order ID:</strong> {order._id}</p>
                <p><strong>💰 Total:</strong> ₹{order.totalAmount.toFixed(2)}</p>
                <p><strong>📚 Items:</strong> {order.items.map(item => item.bookId?.title || "Unknown Book").join(", ")}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
