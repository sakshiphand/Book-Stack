
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import customerRoutes from "./routes/customerRoutes.js"; // ✅ Add this

dotenv.config();

// ✅ Connect to Database (with Error Handling)
connectDB().catch((error) => {
  console.error("❌ Database Connection Failed:", error);
  process.exit(1); // Exit process on failure
});

const app = express();

// ✅ Middleware: CORS (Security)
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend domain
  credentials: true, // Allow cookies (if needed)
}));

app.use(express.json()); // ✅ Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Allow form data parsing

// ✅ Debugging Middleware (Log Requests)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  if (Object.keys(req.body).length) {
    console.log("🔹 Request Body:", req.body);
  }
  next();
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes); // ✅ Add customer routes

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
