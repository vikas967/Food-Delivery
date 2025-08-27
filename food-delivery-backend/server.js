// Import required packages
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App configuration
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable CORS for all origins (for development)

// db connection

connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

// Routes
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server Started on http://localhost:${port}`);
});
