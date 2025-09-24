import express from "express";
import { addBook, getBooks, deleteBook } from "../controllers/bookController.js";
import Book from "../models/Book.js";  // Ensure this is imported

const router = express.Router();

// ✅ Correct the route (REMOVE `/api/books` from here)
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.get("/test", (req, res) => {
  res.json({ message: "Books route is working!" });
});

router.post("/", addBook);
router.get("/", getBooks);
router.delete("/:id", deleteBook);

export default router;
