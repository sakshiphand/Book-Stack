import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateBook = ({ bookId }) => {
  const [book, setBook] = useState({ title: "", author: "", price: "" });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${bookId}`).then((res) => setBook(res.data));
  }, [bookId]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/books/${bookId}`, book);
      alert("Book Updated Successfully!");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div>
      <h2>Update Book</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" name="title" value={book.title} onChange={handleChange} required />
        <input type="text" name="author" value={book.author} onChange={handleChange} required />
        <input type="number" name="price" value={book.price} onChange={handleChange} required />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;
