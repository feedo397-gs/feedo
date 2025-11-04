import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  type: String, // "veg", "non-veg", "drink", etc.
  price: Number,
  image: String
});

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [itemSchema]
});

export default mongoose.model("Shop", shopSchema);
