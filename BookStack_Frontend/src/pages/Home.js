import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>📚 Welcome to the Online Book Store</h1>
      <p>Find your favorite books at the best prices!</p>
      <div style={styles.menu}>
        <Link to="/books" style={styles.link}>📖 Browse Books</Link>
        <Link to="/login" style={styles.link}>🔑 Login</Link>
        <Link to="/register" style={styles.link}>📝 Register</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#FFE4E1", // Page background color (misty rose)
    minHeight: "100vh",
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
    backgroundColor: "#800000", // Maroon
    width: "200px", // ✅ Fixed width for all buttons
    padding: "10px 0",
    borderRadius: "5px",
    textAlign: "center",
    display: "inline-block",
  },
};

export default Home;
