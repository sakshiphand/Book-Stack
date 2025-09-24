import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const styles = {
    page: {
      backgroundColor: "#FFE4E1", // Misty Rose
      minHeight: "100vh",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif",
    },
    container: {
      maxWidth: "800px",
      margin: "auto",
    },
    title: {
      textAlign: "center",
      color: "#0c0000ff", // Maroon
      fontSize: "32px",
      marginBottom: "30px",
      fontWeight: "bold",
    },
    search: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #800000",
      marginBottom: "30px",
      fontSize: "16px",
    },
    bookItem: {
      backgroundColor: "#FFF0F5", // Light pink
      padding: "20px",
      marginBottom: "20px",
      borderRadius: "10px",
      border: "1px solid #800000",
      boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
      transition: "transform 0.2s, box-shadow 0.2s",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    bookItemHover: {
      transform: "scale(1.01)",
      boxShadow: "3px 3px 15px rgba(0,0,0,0.2)",
    },
    link: {
      textDecoration: "none",
      color: "#800000",
      fontSize: "18px",
      fontWeight: "bold",
    },
    author: {
      color: "#333",
      marginTop: "5px",
    },
    price: {
      color: "#008000", // Green
      fontWeight: "bold",
      fontSize: "16px",
    },
    noBooks: {
      textAlign: "center",
      color: "red",
      fontSize: "18px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>📚 Available Books</h2>

        <input
          type="text"
          placeholder="Type to find your next read..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.search}
        />

        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book._id}
              style={styles.bookItem}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.01)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div>
                <Link to={`/books/${book._id}`} style={styles.link}>
                  {book.title}
                </Link>
                <p style={styles.author}>Author: {book.author}</p>
              </div>
              <div style={styles.price}>₹{book.price}</div>
            </div>
          ))
        ) : (
          <p style={styles.noBooks}>No books found</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
