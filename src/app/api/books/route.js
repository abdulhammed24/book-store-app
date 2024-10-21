import connectToDatabase from "../../../../lib/db";
import Book from "../../../../models/Book";

export async function GET(request) {
  await connectToDatabase();
  const books = await Book.find();
  return new Response(JSON.stringify(books), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request) {
  await connectToDatabase();
  const data = await request.json();
  const book = new Book(data);
  await book.save();
  return new Response(JSON.stringify(book), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
