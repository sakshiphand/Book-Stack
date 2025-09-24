import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [book, setBook] = useState({ title: "", author: "", price: "" });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/books", book);
      alert("Book Added Successfully!");
      setBook({ title: "", author: "", price: "" }); // Reset form
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={book.title} onChange={handleChange} required />
        <input type="text" name="author" placeholder="Author" value={book.author} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={book.price} onChange={handleChange} required />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
