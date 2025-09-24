import Book from "../models/Book.js";

// ✅ Add Book
export const addBook = async (req, res) => {
  try {
    console.log("Incoming Request Body:", req.body);
    const { title, author, price } = req.body;

    if (!title || !author || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = new Book({ title, author, price });
    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Error adding book", error });
  }
};

// ✅ Get All Books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Error fetching books", error });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Error deleting book", error });
  }
};