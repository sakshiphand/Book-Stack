import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Error fetching book details")
      );
  }, [id]);

  const handleAddToCart = () => {
    if (book) {
      dispatch(addToCart(book));
      navigate("/cart");
    }
  };

  const styles = {
    page: {
      backgroundColor: "#FFE4E1", // Page background (Misty Rose)
      color: "#4A0905", // Dark red text
      minHeight: "100vh",
      padding: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    container: {
      border: "1px solid #800000", // Maroon border
      borderRadius: "10px",
      padding: "20px",
      width: "80%",
      maxWidth: "500px",
      backgroundColor: "#F8F0E3", // Light beige
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    },
    title: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#800000", // Maroon
      marginBottom: "10px",
    },
    author: {
      color: "#4A0905",
      marginBottom: "5px",
    },
    price: {
      color: "#008000", // Green
      fontWeight: "bold",
      marginBottom: "15px",
    },
    button: {
      backgroundColor: "#800000", // Maroon
      color: "#fff",
      padding: "10px 15px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
    error: {
      color: "red",
      textAlign: "center",
      marginTop: "20px",
    },
    loading: {
      textAlign: "center",
      marginTop: "20px",
    },
  };

  if (error) {
    return <h2 style={styles.error}>⚠️ {error}</h2>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {book ? (
          <>
            <h2 style={styles.title}>{book.title}</h2>
            <p style={styles.author}>Author: {book.author}</p>
            <p style={styles.price}>Price: ₹{book.price}</p>
            <button style={styles.button} onClick={handleAddToCart}>
              Add to Cart
            </button>
          </>
        ) : (
          <p style={styles.loading}>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
