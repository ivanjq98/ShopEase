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

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/orders", orders);
app.use("/api/stripe", stripe);
app.use("/api/products", productsRoute);
app.use("/api/users", users);

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});

const uri = process.env.DB_URI;
const port = process.env.PORT || 5000;

// Check if MongoDB URI is defined

// DB_URI = mongodb+srv://tanivancjq:tanivancjq@cluster0.ghdljwq.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0

if (!uri) {
  console.error("DB_URI is not defined in the .env file.");
  process.exit(1);
}

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose.connect(uri)
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
