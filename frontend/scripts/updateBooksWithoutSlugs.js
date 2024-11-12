import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "../models/Book.js";
import { slugify } from "../src/utils/slugify.js";

dotenv.config({ path: ".env.local" });

async function updateBooksWithoutSlugs() {
  // Log the MongoDB URI for debugging
  console.log("MongoDB URI:", process.env.MONGODB_URI);

  // Connect to the database
  await mongoose.connect(process.env.MONGODB_URI);

  try {
    // Find all books without a slug
    const booksWithoutSlugs = await Book.find({ slug: { $exists: false } });

    console.log(`Found ${booksWithoutSlugs.length} books without slugs.`);

    // Iterate over each book and update it
    for (const book of booksWithoutSlugs) {
      const slug = slugify(book.title); // Generate slug from title

      // Update the book with the new slug
      await Book.updateOne({ _id: book._id }, { slug });
      console.log(`Updated book with title "${book.title}" to slug "${slug}".`);
    }

    console.log("All books updated successfully.");
  } catch (error) {
    console.error("Error updating books:", error);
  } finally {
    // Close the database connection
    await mongoose.disconnect();
  }
}

// Run the update function
updateBooksWithoutSlugs();
