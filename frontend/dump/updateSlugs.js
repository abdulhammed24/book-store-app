// scripts/updateSlugs.js
import mongoose from "mongoose";
import slugify from "slugify";
import Book from "../models/Book"; // Adjust the path as necessary
import { connectToDB } from "../lib/db"; // Adjust the path as necessary

const updateSlugs = async () => {
  await connectToDB(); // Connect to your MongoDB database

  try {
    const books = await Book.find(); // Retrieve all books

    for (const book of books) {
      if (!book.slug) {
        // Check if the slug is missing
        const slug = slugify(book.title, { lower: true }); // Generate slug
        book.slug = slug; // Assign the generated slug to the book
        await book.save(); // Save the updated book
        console.log(`Updated slug for: ${book.title} -> ${slug}`);
      }
    }

    console.log("All slugs updated successfully.");
  } catch (error) {
    console.error("Error updating slugs:", error);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
};

updateSlugs();
