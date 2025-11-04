import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  mobile: { type: String, required: true, unique: true },
  otp: { type: String },
});

export default mongoose.model("User", userSchema);
