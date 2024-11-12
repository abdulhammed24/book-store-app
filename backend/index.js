import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors({ origin: "https://abdulhammed-portfolio.onrender.com/" }));
const allowedOrigins = [
  "https://abdulhammed-portfolio.onrender.com",
  "http://localhost:3000",
  "https://theabdulhammed.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api", bookRoutes);

// Basic route for testing
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
