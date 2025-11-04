import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  phone: String,
  shopName: String,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: Number,
  location: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
