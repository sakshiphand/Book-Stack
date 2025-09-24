import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>
      <div style={styles.menu}>
        <Link to="/admin/add-book" style={styles.link}>📚 Add Book</Link>
        <Link to="/admin/manage-books" style={styles.link}>📖 Manage Books</Link>
        <Link to="/admin/orders" style={styles.link}>📦 View Orders</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    fontSize: "18px",
    color: "#fff",
    backgroundColor: "#007bff",
    padding: "10px 15px",
    borderRadius: "5px",
  },
};

export default AdminDashboard;