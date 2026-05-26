const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const register = require("./routes/register");
const login = require("./routes/login");
const orders = require("./routes/orders");
const stripe = require("./routes/stripe");
const productsRoute = require("./routes/products");
const users = require("./routes/users");

const products = require("./products");

const app = express();

require("./models");

// Load environment variables
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/orders", orders);
app.use("/api/stripe", stripe);
app.use("/api/products", productsRoute);
app.use("/api/users", users);

app.get("/", (req, res) => {
  res.send("Welcome to ShopEase API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});

// ====================== CONFIG ======================
const PORT = process.env.PORT || 5001;
const DB_URI = process.env.DB_URI;

// Check DB_URI
if (!DB_URI) {
  console.error("❌ DB_URI is not defined in environment variables!");
  process.exit(1);
}

// ====================== CONNECT TO MONGODB ======================
mongoose.connect(DB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
    
    const dbName = mongoose.connection.db.databaseName;
    console.log(`📊 Connected Database Name: ${dbName}`);
    
    if (dbName === "test") {
      console.log("⚠️ You are using the default 'test' database.");
    }
  })
  .catch((err) => {
    console.error("❌ Connection Failed:", err.message);
  });
// ====================== START SERVER ======================
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful shutdown (Good practice for Render)
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});