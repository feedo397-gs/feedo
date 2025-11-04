import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { phone, shopName, items, totalAmount, location } = req.body;

    if (!phone || !shopName || !items?.length) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newOrder = await Order.create({ phone, shopName, items, totalAmount, location });
    res.json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders by phone
router.get("/:phone", async (req, res) => {
  try {
    const orders = await Order.find({ phone: req.params.phone }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
