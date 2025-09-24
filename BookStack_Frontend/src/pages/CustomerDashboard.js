import React from "react";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  return (
    <div style={styles.container}>
      <h2>Welcome! Let’s Get Started</h2>
      <div style={styles.menu}>
        {/* Browse Books */}
        <Link to="/books" style={styles.link}>📚 Browse Books</Link>
        {/* View Cart */}
        <Link to="/cart" style={styles.link}>🛒 View Cart</Link>
        {/* My Orders */}
        <Link to="/orders" style={styles.link}>🛒 My Orders</Link>
        {/* Update Profile */}
        <Link to="/profile" style={styles.link}>👤 Update Profile</Link>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    minHeight: "80vh", // Ensures content is visible
    backgroundColor: "#FFE4E1", // Page background color
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
    marginTop: "20px",
  },
  link: {
    textDecoration: "none",
    fontSize: "18px",
    color: "#fff",
    backgroundColor: "#800000", // Maroon color for buttons
    width: "200px", // ✅ Fixed width for all buttons
    padding: "10px 0",
    borderRadius: "5px",
    transition: "0.3s",
    textAlign: "center",
    display: "inline-block",
  },
};

export default CustomerDashboard;
