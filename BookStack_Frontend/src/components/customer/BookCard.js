import React from "react";
import { useSelector } from "react-redux";
import OrderBook from "./OrderBook";

const BookCard = ({ book }) => {
  const user = useSelector((state) => state.auth.user); // Get logged-in user

  const styles = {
    container: {
      border: "1px solid #800000", // Maroon border
      borderRadius: "10px",
      padding: "15px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      marginBottom: "15px",
      backgroundColor: "#F8F0E3", // Light beige
    },
    title: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#000000",
    },
    author: {
      color: "#333333",
      margin: "5px 0",
    },
    price: {
      color: "#008000", // Green
      fontWeight: "bold",
      marginBottom: "10px",
    },
    loginMsg: {
      color: "#800000", // Maroon
      fontStyle: "italic",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{book.title}</h2>
      <p style={styles.author}>Author: {book.author}</p>
      <p style={styles.price}>${book.price}</p>

      {/* Show Order Now button only if user is logged in */}
      {user ? (
        <OrderBook bookId={book._id} userId={user._id} />
      ) : (
        <p style={styles.loginMsg}>Please login to order</p>
      )}
    </div>
  );
};

export default BookCard;
