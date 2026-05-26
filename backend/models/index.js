const { User } = require("./user");
const { Product } = require("./Product");
const { Order } = require("./Order");

console.log("✅ All models loaded successfully");

module.exports = {
  User,
  Product,
  Order,
};