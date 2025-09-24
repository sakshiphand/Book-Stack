import React, { useEffect, useState } from "react";
import axios from "axios";

const DeleteBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/books").then((res) => setBooks(res.data));
  }, []);

  const handleDelete = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${bookId}`);
        setBooks(books.filter((book) => book._id !== bookId));
        alert("Book Deleted Successfully!");
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  return (
    <div>
      <h2>Delete Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} - {book.author} (${book.price})
            <button onClick={() => handleDelete(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteBook;