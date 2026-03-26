const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/sportsphere")
  .then(() => console.log("MongoDB Connected"));

// MODELS
const User = mongoose.model("User", {
  username: String,
  password: String
});

const Product = mongoose.model("Product", {
  name: String,
  price: Number
});

const Order = mongoose.model("Order", {
  items: Array
});
// ROUTES
app.post("/login", async (req, res) => {
  let user = await User.findOne(req.body);
  if (user) res.json({ message: "Login successful" });
  else res.json({ message: "Invalid credentials" });
});

app.get("/products", async (req, res) => {
  let products = await Product.find();
  res.json(products);
});

app.post("/order", async (req, res) => {
  let order = new Order({ items: req.body.cart });
  await order.save();
  res.json({ message: "Order saved" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
