import express from "express";
import {
  createBook,
  getAllBooks,
  getBookBySlug,
  updateBookBySlug,
  deleteBookBySlug,
} from "../controllers/bookController.js";

const router = express.Router();

// Route to create a book
router.post("/books", createBook);

// Route to get all books (sorted by latest)
router.get("/books", getAllBooks);

// Route to get a single book by slug
router.get("/books/:slug", getBookBySlug);

// Route to update a book by slug
router.put("/books/:slug", updateBookBySlug);

// Route to delete a book by slug
router.delete("/books/:slug", deleteBookBySlug);

export default router;
