const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// CONNECT DB
mongoose.connect("mongodb://127.0.0.1:27017/sportsphere")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ================= MODELS =================

// USER
const User = mongoose.model("User", {
  username: String,
  password: String
});

// PRODUCT (ADD CATEGORY 🔥)
const Product = mongoose.model("Product", {
  name: String,
  price: Number,
  category: String
});

// ORDER (IMPROVED 🔥)
const Order = mongoose.model("Order", {
  items: Array,
  total: Number,
  paymentMethod: String,
  status: { type: String, default: "Success" },
  createdAt: { type: Date, default: Date.now }
});

// ================= ROUTES =================

// LOGIN
app.post("/login", async (req, res) => {
  try {
    let user = await User.findOne(req.body);

    if (user) {
      res.json({ message: "Login successful" });
    } else {
      res.json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET PRODUCTS
app.get("/products", async (req, res) => {
  try {
    let products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// ORDER + FAKE PAYMENT
app.post("/order", async (req, res) => {
  try {
    let { cart, method } = req.body;

    // CALCULATE TOTAL
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.qty;
    });

    // SAVE ORDER
    let order = new Order({
      items: cart,
      total: total,
      paymentMethod: method || "UPI"
    });

    await order.save();

    res.json({
      message: "Payment Successful (Fake)",
      total: total,
      orderId: order._id
    });

  } catch (err) {
    res.status(500).json({ message: "Order failed" });
  }
});

// SERVER
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
