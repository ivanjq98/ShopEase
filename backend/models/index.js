const { User } = require("./user");
const { Product } = require("./product");
const { Order } = require("./order");

console.log("✅ All models loaded successfully");

module.exports = {
  User,
  Product,
  Order,
};