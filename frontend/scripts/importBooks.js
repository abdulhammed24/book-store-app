import slugify from "slugify";
import { connectToDB } from "../lib/db.js";
import Book from "../models/Book.js";

async function addSlugsToExistingBooks() {
  await connectToDB();

  try {
    const books = await Book.find(); // Fetch all existing books

    for (const book of books) {
      if (!book.slug) {
        // Check if the slug is missing
        const slug = slugify(book.title, { lower: true });

        // Check for slug collisions
        const existingBook = await Book.findOne({ slug });
        if (existingBook) {
          console.log(`Slug collision for "${book.title}". Skipping...`);
          continue; // Skip if the slug already exists
        }

        // Update the book with the new slug
        book.slug = slug;
        await book.save();
        console.log(`Updated book: ${book.title} with slug: ${slug}`);
      }
    }
  } catch (error) {
    console.error("Error updating books:", error);
  }
}

// Run the function
addSlugsToExistingBooks();
