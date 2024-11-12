import Book from "../models/Book.js";

// Create a new book
export const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(200).json({ message: "Book created successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error creating book", error });
  }
};

// Get all books (sorted by latest)
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Books retrieved successfully", books });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books", error });
  }
};

// Get a single book by slug
export const getBookBySlug = async (req, res) => {
  try {
    const book = await Book.findOne({ slug: req.params.slug });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book retrieved successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving book", error });
  }
};

// Update a book by slug
export const updateBookBySlug = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};

// Delete a book by slug
export const deleteBookBySlug = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ slug: req.params.slug });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};
